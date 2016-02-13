var TextStyle = function (name, attributes) {

  this.name = name;
  this.attributes = attributes;
  this.font = attributes().objectForKey("NSFont")
  this.color = attributes().objectForKey("NSColor");
  this.paragraph = attributes().objectForKey("NSParagraphStyle");
  this.kern = attributes().objectForKey("NSKern");

};
