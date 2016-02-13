@import "Source/Export/swiftUtils.js"

// Responsible of generating swift output for given defined text styles
var SwiftTextStyles = {

  generateSwiftTextStyles: function(definedTextStyles) {
    var output = "";

    for (var key in definedTextStyles) {
      var textStyle = definedTextStyles[key];
      output += SwiftTextStyles.generateTextStyleFuncOutput(textStyle)
    }

    return output;
  },

  generateTextStyleFuncOutput: function(textStyle) {
    var funcOutput = "";

    funcOutput += textStyle.name;
    funcOutput += SwiftUtils.newLine();

    return funcOutput;
  }

};
