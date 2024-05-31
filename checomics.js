// Cash price
if (
  typeof jQuery !== "undefined" &&
  typeof Intl === "object" &&
  typeof Intl.NumberFormat !== "undefined"
) {
  var CASH_DISCOUNT = 20;
  var CASH_DISCOUNT_SHOW = true;
  var FREE_SHIPPING_MIN = 25000;
  var FREE_SHIPPING_SHOW = true;

  jQuery(document).ready(function () {
    var getPriceCash = function (discount, priceStr) {
      if (
        discount &&
        priceStr &&
        priceStr.startsWith("$") &&
        priceStr.includes(",")
      ) {
        var price = priceStr
          .replace("$", "")
          .replace(".", "")
          .replace(",", ".");
        var priceInt = parseFloat(price);
        var discount = priceInt * (discount / 100);
        var priceCash = priceInt - discount;
        var formatter = new Intl.NumberFormat("es-AR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return {
          str: formatter.format(priceCash).trim(),
          int: priceCash,
        };
      }
    };

    var getPriceCard = function (installments, priceStr) {
      if (
        installments > 1 &&
        priceStr &&
        priceStr.startsWith("$") &&
        priceStr.includes(",")
      ) {
        var price = priceStr
          .replace("$", "")
          .replace(".", "")
          .replace(",", ".");
        var priceInt = parseFloat(price);
        var priceCard = Math.round((priceInt / installments) * 100) / 100;
        var formatter = new Intl.NumberFormat("es-AR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return {
          str: formatter.format(priceCard).trim(),
          int: priceCard,
        };
      }
    };

    var appendCashDiscount = function (
      mainSelector,
      priceSelector,
      priceAdditionalSelector,
      mediaSelector,
      textDiscount,
      isOffer
    ) {
      var priceStr = isOffer
        ? jQuery(mainSelector)
            .find(priceSelector)
            .contents()
            .eq(2)
            .text()
            .trim()
        : jQuery(mainSelector).find(priceSelector).text().trim();
      var priceCash = getPriceCash(CASH_DISCOUNT, priceStr);

      if (priceCash) {
        jQuery(mainSelector)
          .find(priceAdditionalSelector)
          .text(`$${priceCash.str} ${textDiscount}`);

        if (FREE_SHIPPING_SHOW && priceCash.int >= FREE_SHIPPING_MIN) {
          jQuery(mediaSelector).append(
            "<span class='products-free-shipping'>Incluye envío gratis</span>"
          );
        }
      }
    };

    // Product
    var priceProductWrap = ".product-vip__price";
    var priceProduct = ".product-vip__price-value";
    var priceProductTransfer = ".product-vip__promo-transfer-value";
    if (jQuery(priceProduct).length && jQuery(priceProductTransfer).length) {
      var priceSelector = jQuery(priceProduct).has("del").length
        ? jQuery(priceProduct).clone().find("del").remove().end()
        : jQuery(priceProduct);
      var priceStr = priceSelector.text().trim();
      var priceCash = getPriceCash(CASH_DISCOUNT, priceStr);
      if (priceCash) {
        jQuery(priceProductTransfer).append(
          " <strong>$" + priceCash.str + "</strong>"
        );
      }
    }

    var installmentsEnabled = false;
    var priceProductCard = ".product-vip__promo-installments";
    var installments = 2;
    if (
      installmentsEnabled &&
      jQuery(priceProductCard).length === 0 &&
      jQuery(priceProduct).length
    ) {
      var priceSelector = jQuery(priceProduct).has("del").length
        ? jQuery(priceProduct).clone().find("del").remove().end()
        : jQuery(priceProduct);
      var priceStr = priceSelector.text().trim();
      var priceCard = getPriceCard(installments, priceStr);
      if (priceStr) {
        jQuery(priceProductWrap).after(
          `<p class="product-vip__promo-installments text--primary">
            <i class="far fa-credit-card"></i>
            <span class="product-vip__promo-installments-value"><strong>${installments}</strong> cuotas sin interés de <strong>$${priceCard.str}</strong></span>
          </p>`
        );
      }
    }

    // Home
    var homeItems = ".block-products-feed__product-wrapper";
    var homePrice = ".block-products-feed__product-price";
    var homePriceAdditional = ".block-products-feed__product-additional";
    var homeItemsMedia = ".block-products-feed__product-media";
    if (CASH_DISCOUNT_SHOW && jQuery(homeItems).length) {
      jQuery(homeItems).each(function () {
        appendCashDiscount(
          this,
          homePrice,
          homePriceAdditional,
          homeItemsMedia,
          `(${CASH_DISCOUNT}% OFF transferencia)`,
          false
        );
      });
    }

    // Products
    var productsItems = ".products-feed__product-wrapper";
    var productsPrice = ".products-feed__product-price";
    var productsPriceAdditional = ".products-feed__product-additional";
    var productsItemsMedia = ".products-feed__product-media";
    if (CASH_DISCOUNT_SHOW && jQuery(productsItems).length) {
      setInterval(function () {
        jQuery(productsItems).each(function () {
          var productsPriceAdditionalText = jQuery(this)
            .find(productsPriceAdditional)
            .text()
            .trim();
          if (!productsPriceAdditionalText) {
            appendCashDiscount(
              this,
              productsPrice,
              productsPriceAdditional,
              productsItemsMedia,
              `(${CASH_DISCOUNT}% OFF)`,
              jQuery(location).attr("href").includes("/ofertas") || false
            );
          }
        });
      }, 1000);
    }
  });
}

// // Fix ML
// function get_mercadopago_installments(callback) {
//   if (medios_pago.mercadopago) {
//     var installments = {
//       2: {
//         setup: false,
//         free: [],
//       },

//       3: {
//         setup: false,
//         free: [],
//       },

//       6: {
//         setup: false,
//         free: [],
//       },

//       9: {
//         setup: false,
//         free: [],
//       },

//       12: {
//         setup: false,
//         free: [],
//       },

//       18: {
//         setup: false,
//         free: [],
//       },

//       24: {
//         setup: false,
//         free: [],
//       },
//     };

//     Mercadopago.setPublishableKey(medios_pago.mercadopago_public_key);
//     Mercadopago.getInstallments(
//       {
//         bin: "480543",
//         amount: s_producto.precio,
//       },

//       function (status, response_b) {
//         if (status === 200) {
//           if (response_b.length) {
//             response_b[0].payer_costs.forEach(function (item) {
//               if (item.installment_rate === 0 && item.installments > 1) {
//                 installments[item.installments.toString()].setup = true;
//               }
//             });

//             return callback(false, installments);
//           } else {
//             return callback(false, installments);
//           }
//         } else {
//           return callback(false, installments);
//         }
//       }
//     );
//   } else {
//     return callback(false, null);
//   }
// }
