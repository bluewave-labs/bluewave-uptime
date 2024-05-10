"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FocusTrap: true
};
Object.defineProperty(exports, "FocusTrap", {
  enumerable: true,
  get: function () {
    return _FocusTrap.FocusTrap;
  }
});
var _FocusTrap = require("./FocusTrap");
var _FocusTrap2 = require("./FocusTrap.types");
Object.keys(_FocusTrap2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FocusTrap2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FocusTrap2[key];
    }
  });
});