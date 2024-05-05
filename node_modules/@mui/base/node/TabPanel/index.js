"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TabPanel: true
};
Object.defineProperty(exports, "TabPanel", {
  enumerable: true,
  get: function () {
    return _TabPanel.TabPanel;
  }
});
var _TabPanel = require("./TabPanel");
var _TabPanel2 = require("./TabPanel.types");
Object.keys(_TabPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TabPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabPanel2[key];
    }
  });
});
var _tabPanelClasses = require("./tabPanelClasses");
Object.keys(_tabPanelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabPanelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabPanelClasses[key];
    }
  });
});