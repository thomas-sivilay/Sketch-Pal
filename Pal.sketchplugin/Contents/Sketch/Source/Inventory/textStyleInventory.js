@import "Source/Model/textstyle.js"

var TextStyleInventory = {

  // Return the shared styles colors dictionary
  // Keys are the name of the shared styles
  // Values are the HEX value
  definedTextStyles: function(sharedTextStyles) {
    var dictionary = {}

    for (var i = 0; i < sharedTextStyles.objects().count(); i++) {
      var style = sharedTextStyles.objects().objectAtIndex(i);
      dictionary[style.name()] = new TextStyle(style.name(), style.style().textStyle().attributes);
    }

    return dictionary;
  }
};
