@import "Source/Model/color.js"

var ColorInventory = {

  // Return the shared styles colors dictionary
  // Keys are the name of the shared styles
  // Values are the HEX value
  definedColors: function(sharedStyles) {
    var dictionary = {}
    log("--- Color Dictionary: ");

    for (var i = 0; i < sharedStyles.objects().count(); i++) {
      var style = sharedStyles.objects().objectAtIndex(i);
      if (style.style().fill() != null) {
        log(style);
        dictionary[style.style().fill().color().hexValue()] = new Color(style.name(), style.style().fill().color().hexValue(), style.style().fill().color())//style.style();
        log(style.style().fill().color().hexValue()  + " : " + style.name());
      }
    }

    return dictionary;
  }
};
