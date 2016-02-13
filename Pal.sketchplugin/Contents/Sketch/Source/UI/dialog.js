@import "Source/Inventory/colorInventory.js"
@import "Source/Inventory/textStyleInventory.js"
@import "Source/Inventory/sharedInventory.js"
@import "Source/Vaccum/vacum.js"
@import "Source/Export/export.js"
@import "Source/Export/swiftColors.js"
@import "Source/Export/swiftTextStyles.js"
@import "Source/UI/image.js"

var Dialog = {

  run: function(context) {
    var doc = context.document;
    var plugin = context.plugin;

    var sharedStyles = SharedInventory.sharedStyles(doc);
    var sharedTextStyles = SharedInventory.sharedTextStyles(doc);

    var definedColors = ColorInventory.definedColors(sharedStyles);
    var definedTextStyles = TextStyleInventory.definedTextStyles(sharedTextStyles);
    var definedColorsCount = Object.keys(definedColors).length;
    var defiendTextStylesCount = Object.keys(definedTextStyles).length;

    var icon = Image.imageWithPath(plugin.urlForResourceNamed("ic_export.png").path());
    var alert = Dialog.defaultAlert(icon, definedColorsCount, defiendTextStylesCount);
    var response = alert.runModal();

    if (response == "1000") {

      //Vaccum.run(doc, definedColors, definedColors, sharedStyles);
      var url = Export.selectExportLocationURL();

      var colorPath = Export.pathForURL(url, "UIColorExtension.swift");
      var definedColorsOutput = SwiftColors.generateSwiftColors(definedColors);
      Export.writeDataInPath(definedColorsOutput, colorPath);

      var textPath = Export.pathForURL(url, "NSDictionaryExtension.swift");
      var definedTextStylesOutput = SwiftTextStyles.generateSwiftTextStyles(definedTextStyles, definedColors);
      Export.writeDataInPath(definedTextStylesOutput, textPath);
    } else {
      return;
    }
  },

  defaultAlert: function(icon, definedColorsCount, definedTextStylesCount) {
    var alert = COSAlertWindow.new();

    alert.setMessageText("Export");
    //alert.setInformativeText("Select below..");
    alert.setIcon(icon);
    alert.addButtonWithTitle("Select location");
    alert.addButtonWithTitle("Cancel");
    alert.addAccessoryView(Dialog.checkbox(Dialog.exportTitleWithCount("Colors", definedColorsCount) , true));
    alert.addAccessoryView(Dialog.checkbox(Dialog.exportTitleWithCount("Text Styles", definedTextStylesCount), true));

    return alert;
  },

  checkbox: function(title, state) {
    var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 150, 18));

    checkbox.setButtonType(NSSwitchButton);
    checkbox.setTitle(title);
    checkbox.setState(state);

    return checkbox;
  },

  exportTitleWithCount: function(title, count) {
    return "Export " + count + " " + title;
  }
};
