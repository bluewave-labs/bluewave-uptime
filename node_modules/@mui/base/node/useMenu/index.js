"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useMenu: true
};
Object.defineProperty(exports, "useMenu", {
  enumerable: true,
  get: function () {
    return _useMenu.useMenu;
  }
});
var _useMenu = require("./useMenu");
var _useMenu2 = require("./useMenu.types");
Object.keys(_useMenu2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useMenu2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useMenu2[key];
    }
  });
});
var _MenuProvider = require("./MenuProvider");
Object.keys(_MenuProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MenuProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MenuProvider[key];
    }
  });
});