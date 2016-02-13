var Image = {

  imageWithPath: function(path) {
    return NSImage.alloc().initByReferencingFile(path);
  },

};
