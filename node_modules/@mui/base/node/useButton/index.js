"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useButton: true
};
Object.defineProperty(exports, "useButton", {
  enumerable: true,
  get: function () {
    return _useButton.useButton;
  }
});
var _useButton = require("./useButton");
var _useButton2 = require("./useButton.types");
Object.keys(_useButton2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useButton2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useButton2[key];
    }
  });
});