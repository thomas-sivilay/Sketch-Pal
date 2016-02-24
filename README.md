# Sketch-Pal
Sketch Pal is a plugin to export all used and defined colors from your Sketch project to swift file. 

## Install

1. Download the ZIP file from the GitHub repo
2. Double click on `Pal.sketchplugin`

## How to use

1. Open your Sketch project
2. Run the plugin (`Plugins > Sketch-Pal > Export Text Styles and Colors`)
3. Select the destination where your Swift file should be exported
4. Add the swift files into your Xcode project

### Limitation & Known issues

##### Missing shared styles

So far the plugin will just use existing shared styles and shared text styles from a given Sketch file to generate swift output. The next steps will provide a way to set undefined colors before the export.

##### Line-Height

The bound box of different software make it harder to play with line-height. The given value from Sketch isn't directly usable in Xcode's interface builder.

---

### License

Sketch Pal is released under the MIT license.

### Author

Thomas SIVILAY
