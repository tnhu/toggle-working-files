/*jslint vars: true */
/*global define, $, brackets, console */

define(function (require, exports, module) {
  "use strict";

  var EXTENSION_ID = "toggle-working-files.toggle";
  var HIDE = 'hide';

  // -- Preferences

  var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  var prefs = PreferencesManager.getExtensionPrefs(EXTENSION_ID);
  var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
  var isEnabled = prefs.get("enabled");

  if (!isEnabled) {
    prefs.definePreference("enabled", "boolean", false);
  }

  // --- Adding "Toggle Working Files" into View and add handler

  var CommandManager = brackets.getModule("command/CommandManager");
  var Menus = brackets.getModule("command/Menus");

  function handler() {
    var enabled = prefs.get("enabled");

    prefs.set("enabled", !enabled);

    $("#working-set-list-container").toggleClass(HIDE);
  }

  CommandManager.register('Toggle Working Files', EXTENSION_ID, handler);

  var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
  menu.addMenuItem(EXTENSION_ID);

  ExtensionUtils.loadStyleSheet(module, 'main.css');

  if (isEnabled) {
    $("#working-set-list-container").addClass(HIDE);
  }
});
