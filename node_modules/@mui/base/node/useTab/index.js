"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useTab: true
};
Object.defineProperty(exports, "useTab", {
  enumerable: true,
  get: function () {
    return _useTab.useTab;
  }
});
var _useTab = require("./useTab");
var _useTab2 = require("./useTab.types");
Object.keys(_useTab2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTab2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTab2[key];
    }
  });
});