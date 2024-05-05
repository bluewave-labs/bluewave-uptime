"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useTabs = require("./useTabs");
Object.keys(_useTabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useTabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabs[key];
    }
  });
});
var _useTabs2 = require("./useTabs.types");
Object.keys(_useTabs2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useTabs2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTabs2[key];
    }
  });
});
var _TabsProvider = require("./TabsProvider");
Object.keys(_TabsProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TabsProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabsProvider[key];
    }
  });
});