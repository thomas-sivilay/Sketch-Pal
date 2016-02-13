@import "Source/Export/swiftUtils.js"

// Responsible of generating swift output for given defined text styles
var SwiftTextStyles = {

  generateSwiftTextStyles: function(definedTextStyles, definedColors) {
    var output = "";

    // import UIKit
    output += SwiftUtils.importe("UIKit");
    output += SwiftUtils.newLine();
    output += SwiftUtils.newLine();
    // extension NSDictionary {
    output += SwiftUtils.extension("NSDictionary");
    output += SwiftUtils.newLine();
    output += SwiftUtils.newLine();


    for (var key in definedTextStyles) {
      var textStyle = definedTextStyles[key];
      var definedColor = definedColors[textStyle.color.hexValue()];
      output += SwiftTextStyles.generateTextStyleFuncOutput(textStyle, definedColor)
    }

    // }
    output += SwiftUtils.newLine();
    output += "}";

    return output;
  },

  generateTextStyleFuncOutput: function(textStyle, definedColor) {
    var funcOutput = "";

    // func dictionaryAttributes() -> [String : AnyObject]? {}
    funcOutput += SwiftUtils.tab();
    funcOutput += SwiftUtils.methodSignature(textStyle.name + "Attributes", "[String: AnyObject]?");
    funcOutput += SwiftUtils.newLine();

    var tabIncr = SwiftUtils.tab() + SwiftUtils.tab();

    // let font
    funcOutput += SwiftUtils.varFont(textStyle.font.fontName(), textStyle.font.pointSize(), tabIncr);
    // let paragraph
    funcOutput += SwiftUtils.varParagraph(textStyle.paragraph, tabIncr);

    // let color
    if (!definedColor) {
      funcOutput += SwiftUtils.varColor(textStyle.color, tabIncr);
    } else {
      funcOutput += SwiftUtils.varDefinedColor(definedColor.name, tabIncr);
    }

    // let kern
    funcOutput += SwiftUtils.varKern(textStyle.kern, tabIncr);
    // return
    funcOutput += SwiftUtils.returnAttributes(tabIncr, true);

    funcOutput += SwiftUtils.tab();
    funcOutput += "}";
    funcOutput += SwiftUtils.newLine() + SwiftUtils.newLine();

    return funcOutput;
  }

};
