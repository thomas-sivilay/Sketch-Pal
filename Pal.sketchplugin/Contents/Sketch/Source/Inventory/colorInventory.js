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
      log(style.style().border());
      if (style.style().fill().fillType() == 0 && (!style.style().border().isEnabled())) {
        dictionary[style.style().fill().color().hexValue()] = new Color(style.name(), style.style().fill().color().hexValue(), style.style().fill().color())//style.style();
      }
    }

    return dictionary;
  }
};
