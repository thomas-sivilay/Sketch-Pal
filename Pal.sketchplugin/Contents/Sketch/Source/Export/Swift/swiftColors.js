@import "Source/Export/Swift/swiftUtils.js"

// Responsible of generating swift output for given defined colors
var SwiftColors = {

  generateSwiftColors: function(definedColors, extension) {
    var output = "";

    // import UIKit
    output += SwiftUtils.importe("UIKit");
    output += SwiftUtils.newLine();
    output += SwiftUtils.newLine();
    // extension UIColor {
    if (extension) {
      output += SwiftUtils.extension("UIColor");
    } else {
      output += SwiftUtils.struct("Color");
    }
    output += SwiftUtils.newLine();
    output += SwiftUtils.newLine();

    for (var key in definedColors) {
      var color = definedColors[key];
      output += SwiftColors.generateColorFuncOutput(color)
    }

    // }
    output += SwiftUtils.newLine();
    output += "}";

    return output;
  },

  generateColorFuncOutput: function(color) {
    var funcOutput = "";

    log(color);

    // func colorNameColor() -> UIColor {
    funcOutput += SwiftUtils.tab();
    funcOutput += SwiftUtils.methodSignature(color.name + "Color", "UIColor")
    funcOutput += SwiftUtils.newLine();

    // return UIColor(red: 255, green: 255, blue: 255, alpha: 1)
    funcOutput += SwiftUtils.tab() + SwiftUtils.tab();
    funcOutput += "return " + SwiftUtils.uiColor(color.msColor);
    funcOutput += SwiftUtils.newLine();

    // }
    funcOutput += SwiftUtils.tab();
    funcOutput += "}";
    funcOutput += SwiftUtils.newLine() + SwiftUtils.newLine();

    return funcOutput;
  }

};
