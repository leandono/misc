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
        });
        return formatter.format(priceCash).trim();
      }
    };

    // Product
    var priceProduct = ".product-vip__price-value";
    var priceProductTransfer = ".product-vip__promo-transfer-value";
    if (jQuery(priceProduct).length && jQuery(priceProductTransfer).length) {
      var priceStr = jQuery(priceProduct).text().trim();
      var priceCash = getPriceCash(priceStr);
      jQuery(priceProductTransfer).append(
        " <strong>$" + priceCash + "</strong>"
      );
    }
  });
}
