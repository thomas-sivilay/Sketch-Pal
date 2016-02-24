@import "Source/Model/color.js"

var ColorInventory = {

  // Return the shared styles colors dictionary
  // Keys are the name of the shared styles
  // Values are the HEX value
  definedColors: function(sharedStyles) {
    var dictionary = {}

    for (var i = 0; i < sharedStyles.objects().count(); i++) {
      var style = sharedStyles.objects().objectAtIndex(i);
      // TODO: Add a method isColor

      var isSimpleFill = !style.style().hasMoreThanOneEnabledFill()
      var hasNoBorder = !style.style().hasEnabledBorder()
      var hasNoShadow = !style.style().hasEnabledShadow()
      var hasNoInnerShadow = !style.style().innerShadow() || !style.style().innerShadow().isEnabled()
      //log("has no shadow: " + hasNoShadow + ", has no border: " + hasNoBorder + ", has no inner shadow:" + hasNoInnerShadow);
      if (style.style().fill() && hasNoBorder && hasNoShadow && isSimpleFill && hasNoInnerShadow) {
        if (style.style().fill().fillType() == 0 && style.style().fill().isEnabled()) {
          dictionary[style.style().fill().color().hexValue()] = new Color(style.name(), style.style().fill().color().hexValue(), style.style().fill().color())//style.style();
        }
      }
    }

    return dictionary;
  }
};
