// Responsible of generating swift output for given defined colors
var SwiftColors = {

  generateSwiftColors: function(definedColors) {
    var output = ""

    for (var key in definedColors) {
      var color = definedColors[key];
      output += color.name + "\r\n";
    }

    return output
  }
};
