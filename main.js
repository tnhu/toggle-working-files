/*jslint vars: true */
/*global define, $, brackets */

define(function (require, exports, module) {
  "use strict";

  var EXTENSION_ID = "toggle-working-files.toggle";

  // -- Preferences

  var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  var prefs = PreferencesManager.getExtensionPrefs(EXTENSION_ID);

  prefs.definePreference("enabled", "boolean", false);

  // --- Adding "Toggle Working Files" into View and add handler

  var CommandManager = brackets.getModule("command/CommandManager");
  var Menus = brackets.getModule("command/Menus");

  function handler() {
    var enabled = prefs.get("enabled");

    prefs.set("enabled", !enabled);

    $("#working-set-list-container").toggle();
  }

  CommandManager.register('Toggle Working Files', EXTENSION_ID, handler);

  var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
  menu.addMenuItem(EXTENSION_ID);

  if (prefs.get("enabled")) {
    $("#working-set-list-container").toggle();
  }
});
