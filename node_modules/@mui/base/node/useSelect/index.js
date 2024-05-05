"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useSelect: true
};
Object.defineProperty(exports, "useSelect", {
  enumerable: true,
  get: function () {
    return _useSelect.useSelect;
  }
});
var _useSelect = require("./useSelect");
var _useSelect2 = require("./useSelect.types");
Object.keys(_useSelect2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSelect2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSelect2[key];
    }
  });
});
var _SelectProvider = require("./SelectProvider");
Object.keys(_SelectProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SelectProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SelectProvider[key];
    }
  });
});