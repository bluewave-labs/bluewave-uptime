"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useOption: true
};
Object.defineProperty(exports, "useOption", {
  enumerable: true,
  get: function () {
    return _useOption.useOption;
  }
});
var _useOption = require("./useOption");
var _useOption2 = require("./useOption.types");
Object.keys(_useOption2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useOption2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useOption2[key];
    }
  });
});
var _useOptionContextStabilizer = require("./useOptionContextStabilizer");
Object.keys(_useOptionContextStabilizer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useOptionContextStabilizer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useOptionContextStabilizer[key];
    }
  });
});