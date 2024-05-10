"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useInput: true
};
Object.defineProperty(exports, "useInput", {
  enumerable: true,
  get: function () {
    return _useInput.useInput;
  }
});
var _useInput = require("./useInput");
var _useInput2 = require("./useInput.types");
Object.keys(_useInput2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useInput2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useInput2[key];
    }
  });
});