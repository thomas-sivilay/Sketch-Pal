// Helper methods for swift output
var SwiftUtils = {

  importe: function(framework) {
    return "import " + framework;
  },

  extension: function(extension) {
    return "extension " + extension + " {";
  },

  methodSignature: function(name) {
    return "func " + SwiftUtils.camelize(SwiftUtils.cleanSymbol(name)) + "() {"
  },

  methodSignature: function(name, output) {
    return "func " + SwiftUtils.camelize(SwiftUtils.cleanSymbol(name)) + "() -> " + output + " {"
  },

  uiColor: function(color) {
    return "UIColor(red: " + color.red() + ", green: " + color.green() + ", blue: " + color.blue() + ", alpha: " + color.alpha() + ")";
  },

  camelize: function(name) {
    return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },

  cleanSymbol: function(str) {
    return str.replace(/[^\w\s]/gi, '');
  },

  tab: function() {
    return "\t";
  },

  newLine: function() {
    return "\r\n";
  },
};
