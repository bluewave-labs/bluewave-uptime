"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useMenuItem: true
};
Object.defineProperty(exports, "useMenuItem", {
  enumerable: true,
  get: function () {
    return _useMenuItem.useMenuItem;
  }
});
var _useMenuItem = require("./useMenuItem");
var _useMenuItem2 = require("./useMenuItem.types");
Object.keys(_useMenuItem2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenuItem2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenuItem2[key];
    }
  });
});
var _useMenuItemContextStabilizer = require("./useMenuItemContextStabilizer");
Object.keys(_useMenuItemContextStabilizer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenuItemContextStabilizer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenuItemContextStabilizer[key];
    }
  });
});