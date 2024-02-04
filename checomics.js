// Cash price
if (
  typeof jQuery !== "undefined" &&
  typeof Intl === "object" &&
  typeof Intl.NumberFormat !== "undefined"
) {
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
        return formatter.format(priceCash).trim();
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
        return formatter.format(priceCard).trim();
      }
    };

    // Product
    var priceProductWrap = ".product-vip__price";
    var priceProduct = ".product-vip__price-value";
    var priceProductTransfer = ".product-vip__promo-transfer-value";
    var cashDiscount = 15;
    if (jQuery(priceProduct).length && jQuery(priceProductTransfer).length) {
      var priceSelector = jQuery(priceProduct).has("del").length
        ? jQuery(priceProduct).clone().find("del").remove().end()
        : jQuery(priceProduct);
      var priceStr = priceSelector.text().trim();
      var priceCash = getPriceCash(cashDiscount, priceStr);
      if (priceCash) {
        jQuery(priceProductTransfer).append(
          " <strong>$" + priceCash + "</strong>"
        );
      }
    }

    var priceProductCard = ".product-vip__promo-installments";
    var installments = 2;
    if (jQuery(priceProductCard).length === 0 && jQuery(priceProduct).length) {
      var priceSelector = jQuery(priceProduct).has("del").length
        ? jQuery(priceProduct).clone().find("del").remove().end()
        : jQuery(priceProduct);
      var priceStr = priceSelector.text().trim();
      var priceCard = getPriceCard(installments, priceStr);
      if (priceStr) {
        jQuery(priceProductWrap).after(
          `<p class="product-vip__promo-installments text--primary">
            <i class="far fa-credit-card"></i>
            <span class="product-vip__promo-installments-value"><strong>${installments}</strong> cuotas sin interés de <strong>$${priceCard}</strong></span>
          </p>`
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
