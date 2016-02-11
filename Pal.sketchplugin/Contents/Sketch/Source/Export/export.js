var Export = {

  selectExportLocationURL: function(data) {
    var openPanel = [NSOpenPanel openPanel]
    [openPanel setTitle: "Choose a location…"]
    [openPanel setMessage: "Select the export location…"];
    [openPanel setPrompt: "Export"];

    [openPanel setCanCreateDirectories: true]
    [openPanel setCanChooseFiles: false]
    [openPanel setCanChooseDirectories: true]
    [openPanel setAllowsMultipleSelection: false]
    [openPanel setShowsHiddenFiles: false]
    [openPanel setExtensionHidden: false]

    var openPanelButtonPressed = [openPanel runModal]
    if (openPanelButtonPressed == NSFileHandlingPanelOKButton) {
      exportLocationURL = [openPanel URL]
    }
    return exportLocationURL
  },

  pathForURL: function(url, filename) {
    var path = url.path();
    path += "/" + filename;
    return path
  },

  writeDataInPath: function(data, filename) {
    var path = [@"" stringByAppendingString:filename],
      str = [@"" stringByAppendingString:data];
      str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)
  }
};
