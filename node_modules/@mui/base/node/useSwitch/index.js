"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useSwitch: true
};
Object.defineProperty(exports, "useSwitch", {
  enumerable: true,
  get: function () {
    return _useSwitch.useSwitch;
  }
});
var _useSwitch = require("./useSwitch");
var _useSwitch2 = require("./useSwitch.types");
Object.keys(_useSwitch2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSwitch2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSwitch2[key];
    }
  });
});