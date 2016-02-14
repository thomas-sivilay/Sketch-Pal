@import "Source/Model/undefinedColor.js"

var ColorAnalyzer = {

  // Might need to add options for text or color only
  analyze: function(document, colorsDictionary, sharedStyles) {
    var undefinedColors = {};

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
          var undefinedLayer = ColorAnalyzer.setSharedStyle(colorsDictionary, layer, sharedStyles);
          if (undefinedLayer != null) {
            var color = new UndefinedColor(undefinedLayer.style().fill().color());
            undefinedColors[undefinedLayer.style().fill().color().hexValue()] = color;
            log(color);
          }
        }
      }
    }
    log("Number of undefined colors: " + Object.keys(undefinedColors).length);

    return undefinedColors;
  },

  setSharedStyle: function(dictionary, layer, sharedStyles) {
    //Is color -> fillType?
    if (layer.style().fill() != null) {
      var hexValue = layer.style().fill().color().hexValue();
      if (dictionary[hexValue] == null) {
        log("Undefined color : " + hexValue + " in " + layer.name())
        return layer;
      }
      // if (layer.style().sharedObjectID() == null) {
      //   //set shared style
      //   for (var i = 0; i < sharedStyles.objects().count(); i++) {
      //     var sharedStyle = sharedStyles.objects().objectAtIndex(i);
      //     if (sharedStyle.style().fill().color().hexValue() === hexValue) {
      //       layer.setStyle(sharedStyle.newInstance());
      //     }
      //   }
      // }
    }

    return null;
  }
};
