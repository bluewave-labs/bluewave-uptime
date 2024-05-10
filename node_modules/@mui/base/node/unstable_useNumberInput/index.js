"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  unstable_useNumberInput: true
};
Object.defineProperty(exports, "unstable_useNumberInput", {
  enumerable: true,
  get: function () {
    return _useNumberInput.useNumberInput;
  }
});
var _useNumberInput = require("./useNumberInput");
var _useNumberInput2 = require("./useNumberInput.types");
Object.keys(_useNumberInput2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useNumberInput2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useNumberInput2[key];
    }
  });
});