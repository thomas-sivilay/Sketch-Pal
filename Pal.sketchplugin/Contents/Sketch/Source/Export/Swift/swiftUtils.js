// Helper methods for swift output
var SwiftUtils = {

  importe: function(framework) {
    return "import " + framework;
  },

  extension: function(extension) {
    return "extension " + extension + " {";
  },

  methodSignature: function(name) {
    return "static func " + SwiftUtils.camelize(SwiftUtils.cleanSymbol(name)) + "() {";
  },

  methodSignature: function(name, output) {
    return "static func " + SwiftUtils.camelize(SwiftUtils.cleanSymbol(name)) + "() -> " + output + " {";
  },

  uiColor: function(color) {
    return "UIColor(red: " + color.red() + ", green: " + color.green() + ", blue: " + color.blue() + ", alpha: " + color.alpha() + ")";
  },

  uiColorWithNSColor: function(nsColor) {
    return "UIColor(red: " + nsColor.redComponent() + ", green: " + nsColor.greenComponent() + ", blue: " + nsColor.blueComponent() + ", alpha: " + nsColor.alphaComponent() + ")";
  },

  varColor: function(color, tabIncr) {
    return tabIncr + "let color = " + SwiftUtils.uiColorWithNSColor(color) + SwiftUtils.newLine();
  },

  varDefinedColor: function(colorName, tabIncr) {
    return tabIncr + "let color = UIColor." + SwiftUtils.camelize(SwiftUtils.cleanSymbol(colorName)) + "Color()" + SwiftUtils.newLine();
  },

  varKern: function(kern, tabIncr) {
    var nonNullKern = kern == null ? "0" : kern;
    return tabIncr + "let kern = " + nonNullKern + SwiftUtils.newLine();
  },

  varFont: function(name, size, tabIncr) {
    var output = "";
    output += tabIncr + "guard let font = UIFont(name: \"" + name + "\", size: " + size + ") else {" + SwiftUtils.newLine();
    output += tabIncr + SwiftUtils.tab() + "fatalError(\"Can't load font\")" + SwiftUtils.newLine();
    output += tabIncr + "}" + SwiftUtils.newLine();

    return output;
  },

  varParagraph: function(paragraph, tabIncr) {
    var output = "";

    output += tabIncr;
    output += "let paragraph = NSMutableParagraphStyle()";
    output += SwiftUtils.newLine();
    output += tabIncr;
    output += "paragraph.minimumLineHeight = " + paragraph.minimumLineHeight();
    output += SwiftUtils.newLine();
    output += tabIncr;
    output += "paragraph.alignment = " + SwiftUtils.nsTextAlignment(paragraph.alignment());
    output += SwiftUtils.newLine();
    output += tabIncr;
    output += "paragraph.paragraphSpacing = " + paragraph.paragraphSpacing();
    output += SwiftUtils.newLine();

    return output;
  },

  nsTextAlignment: function(value) {
    var output = "";

    if (value == 0) {
      output = "Left";
    } else if (value == 2) {
      output = "Center"
    } else if (value == 1) {
      output = "Right"
    } else if (value == 3) {
      output = "Justified"
    } else if (value == 4) {
      output = "Natural"
    }

    return "NSTextAlignment." + output;
  },

  returnAttributes: function(tabIncr, needParagraph) {
    var output = "";

    output += tabIncr;
    output += "return [NSFontAttributeName: font,";
    output += SwiftUtils.newLine();
    output += tabIncr + SwiftUtils.tab();
    output += "NSKernAttributeName: kern,";
    output += SwiftUtils.newLine();
    output += tabIncr + SwiftUtils.tab();
    output += "NSForegroundColorAttributeName: color";

    if (needParagraph) {
      output += ",";
      output += SwiftUtils.newLine();
      output += tabIncr + SwiftUtils.tab();
      output += "NSParagraphStyleAttributeName: paragraph,"
    }

    output += SwiftUtils.newLine();
    output += tabIncr;
    output += "]";
    output += SwiftUtils.newLine();

    return output;
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
