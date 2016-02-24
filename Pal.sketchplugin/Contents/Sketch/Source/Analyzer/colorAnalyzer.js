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
            var undefinedColor = undefinedColors[undefinedLayer.style().fill().color().hexValue()];
            if (undefinedColor != null) {
              var paths = undefinedColor.paths;
              paths.push(path);
              undefinedColors[undefinedLayer.style().fill().color().hexValue()].paths = paths;
            } else {
              var paths = [path];
              var newUndefinedColor = new UndefinedColor(undefinedLayer.style().fill().color(), paths);
              undefinedColors[undefinedLayer.style().fill().color().hexValue()] = newUndefinedColor;
            }
          }
        }
      }
    }

    return undefinedColors;
  },

  setSharedStyle: function(dictionary, layer, sharedStyles) {
     //Is color -> fillType?

     var isSimpleFill = !layer.style().hasMoreThanOneEnabledFill()
     var hasNoBorder = !layer.style().hasEnabledBorder()
     var hasNoShadow = !layer.style().hasEnabledShadow()
     var hasNoInnerShadow = !layer.style().innerShadow() || !layer.style().innerShadow().isEnabled()

     //log("has no shadow: " + hasNoShadow + ", has no border: " + hasNoBorder + ", has no inner shadow:" + hasNoInnerShadow);

     if (layer.style().fill() && hasNoBorder && hasNoShadow && isSimpleFill && hasNoInnerShadow) {
       if (layer.style().fill().fillType() == 0 && layer.style().fill().isEnabled()) {
         var hexValue = layer.style().fill().color().hexValue();
         if (dictionary[hexValue] == null) {
           return layer;
         }
       }
     }

    return null;
  }
};
