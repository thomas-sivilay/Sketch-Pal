@import "Source/Inventory/colorInventory.js"
@import "Source/Inventory/textStyleInventory.js"
@import "Source/Inventory/sharedInventory.js"
@import "Source/Analyzer/colorAnalyzer.js"
@import "Source/Export/export.js"
@import "Source/Export/Swift/swiftColors.js"
@import "Source/Export/Swift/swiftTextStyles.js"
@import "Source/UI/image.js"
@import "Source/Model/undefinedColor.js"

var Dialog = {

  runExport: function(context) {
    var doc = context.document;
    var plugin = context.plugin;

    var sharedStyles = SharedInventory.sharedStyles(doc);
    var sharedTextStyles = SharedInventory.sharedTextStyles(doc);

    var definedColors = ColorInventory.definedColors(sharedStyles);
    var definedTextStyles = TextStyleInventory.definedTextStyles(sharedTextStyles);
    var definedColorsCount = Object.keys(definedColors).length;
    var definedTextStylesCount = Object.keys(definedTextStyles).length;

    var icon = Image.imageWithPath(plugin.urlForResourceNamed("ic_export.png").path());
    var alert = Dialog.exportAlert(icon, definedColorsCount, definedTextStylesCount);
    var response = alert.runModal();

    if (response == "1000") {
      var url = Export.selectExportLocationURL();

      var colorPath = Export.pathForURL(url, "UIColorExtension.swift");
      var definedColorsOutput = SwiftColors.generateSwiftColors(definedColors, true);
      Export.writeDataInPath(definedColorsOutput, colorPath);

      var textPath = Export.pathForURL(url, "NSDictionaryExtension.swift");
      var definedTextStylesOutput = SwiftTextStyles.generateSwiftTextStyles(definedTextStyles, definedColors, true);
      Export.writeDataInPath(definedTextStylesOutput, textPath);
    } else {
      return;
    }
  },

  runAnalyze: function(context) {
    var doc = context.document;
    var plugin = context.plugin;

    var sharedStyles = SharedInventory.sharedStyles(doc);

    var definedColors = ColorInventory.definedColors(sharedStyles);
    var definedColorsCount = Object.keys(definedColors).length;

    var icon = Image.imageWithPath(plugin.urlForResourceNamed("ic_export.png").path());

    var undefinedColors = ColorAnalyzer.analyze(doc, definedColors, sharedStyles);
    var i = 0;
    var count = Object.keys(undefinedColors).length;

    for (var key in undefinedColors) {
      i++;
      var undefinedColor = undefinedColors[key];
      var alert = Dialog.undefinedColorAlert(key, undefinedColor, i, count);
      var response = alert.runModal();
      if (response == "1002") {
        return;
      } else if (response == "1000") {
        // Set
        var name = alert.viewAtIndex(2).stringValue();

        if (name) {
          var style = MSStyle.alloc().init();
          var fill = style.fills().addNewStylePart();
          fill.color = MSColor.colorWithSVGString("#" + key);
          doc.documentData().layerStyles().addSharedStyleWithName_firstInstance(name, style);
        }
      }
    }
    doc.reloadInspector();
  },

  exportAlert: function(icon, definedColorsCount, definedTextStylesCount) {
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

  analyzeAlert: function(icon, definedColorsCount, definedTextStylesCount) {
    var alert = COSAlertWindow.new();

    alert.setMessageText("Analyzer Results");
    //alert.setInformativeText("Select below..");
    alert.setIcon(icon);
    alert.addButtonWithTitle("Finish");
    alert.addAccessoryView(Dialog.button(Dialog.exportTitleWithCount("Colors", definedColorsCount)));
    alert.addAccessoryView(Dialog.button(Dialog.exportTitleWithCount("Text", definedColorsCount)));

    return alert;
  },

  undefinedColorAlert: function(key, color, index, count) {
    var alert = COSAlertWindow.new();
    alert.setMessageText("Undefined Color #" + key + " (" + index + "/" + count + ")");
    alert.addAccessoryView(Dialog.colorView(color));
    alert.addTextLabelWithValue("Color name: ");
    alert.addTextFieldWithValue("");

    alert.addButtonWithTitle("Add Shared Style");
    alert.addButtonWithTitle("I'll do it later..");
    alert.addButtonWithTitle("Abort");

    return alert;
  },

  colorView: function(undefinedColor) {
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 64, 64));
    var msColor = undefinedColor.msColor;
    var red = msColor.red();
    var blue = msColor.blue();
    var green = msColor.green();
    var alpha = msColor.alpha();

    var nsColor = [NSColor colorWithDeviceRed:red green:green blue:blue alpha:alpha];

    view.setWantsLayer(true);
    view.layer().setBackgroundColor(nsColor.CGColor());
    return view;
  },

  checkbox: function(title, state) {
    var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 150, 18));

    checkbox.setButtonType(NSSwitchButton);
    checkbox.setTitle(title);
    checkbox.setState(state);

    return checkbox;
  },

  button: function(title) {
    var button = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 150, 30));

    button.setBezelStyle(1);
    button.setTitle(title);

    return button;
  },

  exportTitleWithCount: function(title, count) {
    return "Export " + count + " " + title;
  }
};
