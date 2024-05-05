"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useTabPanel: true
};
Object.defineProperty(exports, "useTabPanel", {
  enumerable: true,
  get: function () {
    return _useTabPanel.useTabPanel;
  }
});
var _useTabPanel = require("./useTabPanel");
var _useTabPanel2 = require("./useTabPanel.types");
Object.keys(_useTabPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTabPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabPanel2[key];
    }
  });
});