// Cash price
if (typeof jQuery !== "undefined" && typeof Intl.NumberFormat !== "undefined") {
  jQuery(document).ready(function () {
    var getPriceCash = function (priceStr) {
      if (priceStr && priceStr.startsWith("$") && priceStr.endsWith(",00")) {
        var price = priceStr.replace(",00", "").replace(/\D/g, "");
        var priceInt = parseInt(price);
        var discount = priceInt * (15 / 100);
        var priceCash = priceInt - discount;
        var formatter = new Intl.NumberFormat("es-AR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(priceCash).trim();
      }
    };

    // Product
    var priceProduct = ".product-vip__price-value";
    var priceProductTransfer = ".product-vip__promo-transfer-value";
    if (jQuery(priceProduct).length && jQuery(priceProductTransfer).length) {
      var priceSelector = jQuery(priceProduct).has("del").length
        ? jQuery(priceProduct).clone().find("del").remove().end()
        : jQuery(priceProduct);
      var priceStr = priceSelector.text().trim();
      var priceCash = getPriceCash(priceStr);
      if (priceCash) {
        jQuery(priceProductTransfer).append(
          " <strong>$" + priceCash + "</strong>"
        );
      }
    }

    // // Home
    // var homeItems = ".block-products-feed__product";
    // var priceHome = ".block-products-feed__product-price";
    // var priceHomeContainer = ".block-products-feed__product-wrapper";
    // if (
    //   jQuery(homeItems).length &&
    //   jQuery(priceHome).length &&
    //   jQuery(priceHomeContainer).length
    // ) {
    //   jQuery(homeItems).each(function () {
    //     var priceStr = jQuery(this).find(priceHome).text().trim();
    //     var priceCash = getPriceCash(priceStr);
    //     jQuery(this)
    //       .find(priceHomeContainer)
    //       .append(
    //         " <p class='block-products-feed__product-additional text--primary'>15% OFF efectivo/transferencia $" +
    //           priceCash +
    //           "</p>"
    //       );
    //   });
    // }
  });
}

// Fix ML
function get_mercadopago_installments(callback) {
  if (medios_pago.mercadopago) {
    var installments = {
      2: {
        setup: false,
        free: [],
      },

      3: {
        setup: false,
        free: [],
      },

      6: {
        setup: false,
        free: [],
      },

      9: {
        setup: false,
        free: [],
      },

      12: {
        setup: false,
        free: [],
      },

      18: {
        setup: false,
        free: [],
      },

      24: {
        setup: false,
        free: [],
      },
    };

    Mercadopago.setPublishableKey(medios_pago.mercadopago_public_key);
    Mercadopago.getInstallments(
      {
        bin: "480543",
        amount: s_producto.precio,
      },

      function (status, response_b) {
        if (status === 200) {
          if (response_b.length) {
            response_b[0].payer_costs.forEach(function (item) {
              if (item.installment_rate === 0 && item.installments > 1) {
                installments[item.installments.toString()].setup = true;
              }
            });

            return callback(false, installments);
          } else {
            return callback(false, installments);
          }
        } else {
          return callback(false, installments);
        }
      }
    );
  } else {
    return callback(false, null);
  }
}
