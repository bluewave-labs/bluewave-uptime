"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useSnackbar: true
};
Object.defineProperty(exports, "useSnackbar", {
  enumerable: true,
  get: function () {
    return _useSnackbar.useSnackbar;
  }
});
var _useSnackbar = require("./useSnackbar");
var _useSnackbar2 = require("./useSnackbar.types");
Object.keys(_useSnackbar2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSnackbar2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSnackbar2[key];
    }
  });
});