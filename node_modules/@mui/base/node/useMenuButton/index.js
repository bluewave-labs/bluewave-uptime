"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useMenuButton: true
};
Object.defineProperty(exports, "useMenuButton", {
  enumerable: true,
  get: function () {
    return _useMenuButton.useMenuButton;
  }
});
var _useMenuButton = require("./useMenuButton");
var _useMenuButton2 = require("./useMenuButton.types");
Object.keys(_useMenuButton2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenuButton2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenuButton2[key];
    }
  });
});