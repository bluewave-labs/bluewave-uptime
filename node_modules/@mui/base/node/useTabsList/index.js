"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useTabsList: true
};
Object.defineProperty(exports, "useTabsList", {
  enumerable: true,
  get: function () {
    return _useTabsList.useTabsList;
  }
});
var _useTabsList = require("./useTabsList");
var _useTabsList2 = require("./useTabsList.types");
Object.keys(_useTabsList2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useTabsList2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabsList2[key];
    }
  });
});
var _TabsListProvider = require("./TabsListProvider");
Object.keys(_TabsListProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TabsListProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabsListProvider[key];
    }
  });
});