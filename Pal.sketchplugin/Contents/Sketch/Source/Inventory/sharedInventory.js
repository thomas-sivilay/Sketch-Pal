var SharedInventory = {
  sharedStyles: function(document) {
    return document.documentData().layerStyles();
  },

  sharedTextStyles: function(document) {
    return document.documentData().layerTextStyles();
  }
};
