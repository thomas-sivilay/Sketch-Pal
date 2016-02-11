var Vaccum = {

  // Might need to add options for text or color only
  run: function(document, colorsDictionary, textStylesDictionary, sharedStyles) {
    log("--- Run Vacum");

    var undefinedColors = [];
    var undefinedTextStyles = [];

    // For pages
    for (var i = 0; i < document.pages().count(); i++) {
      var page = document.pages().objectAtIndex(i);

      // For artboards
      for (var j = 0; j < page.artboards().count(); j++) {
        var artboard = page.artboards().objectAtIndex(j)

        // For layers
        for (var k = 0; k < artboard.layers().count(); k++) {
          var layer = artboard.layers().objectAtIndex(k)
          var style = layer.style()
          var path = page.name() + "/" + artboard.name() + "/" + layer.name();

          // If style is Color
          var undefinedColor = Vaccum.setSharedStyle(colorsDictionary, layer, sharedStyles);
          if (undefinedColor != null) {
            undefinedColors.push(undefinedColor);
          }

        }
      }
    }
    log("Number of undefined colors: " + undefinedColors.length);
  },

  // logUndefined: function(style, dictionary, path) {
  //   if (style.fill() != null) {
  //     var hexValue =  style.fill().color().hexValue();
  //     if (dictionary[hexValue] == null) {
  //       log(hexValue + " IS UNDEFINED IN " + path);
  //     }
  //   }
  // },

  setSharedStyle: function(dictionary, layer, sharedStyles) {
    //Is color -> fillType?
    if (layer.style().fill() != null) {
      var hexValue = layer.style().fill().color().hexValue();
      if (dictionary[hexValue] == null) {
        log("Undefined color : " + hexValue + " in " + layer.name())
        return layer;
      }
      if (layer.style().sharedObjectID() == null) {
        //set shared style
        for (var i = 0; i < sharedStyles.objects().count(); i++) {
          var sharedStyle = sharedStyles.objects().objectAtIndex(i);
          if (sharedStyle.style().fill().color().hexValue() === hexValue) {
            layer.setStyle(sharedStyle.newInstance());
          }
        }
      }
    }

    return null;
  }
};
