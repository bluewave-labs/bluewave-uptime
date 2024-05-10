"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TabsList: true
};
Object.defineProperty(exports, "TabsList", {
  enumerable: true,
  get: function () {
    return _TabsList.TabsList;
  }
});
var _TabsList = require("./TabsList");
var _TabsList2 = require("./TabsList.types");
Object.keys(_TabsList2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TabsList2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TabsList2[key];
    }
  });
});
var _tabsListClasses = require("./tabsListClasses");
Object.keys(_tabsListClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabsListClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabsListClasses[key];
    }
  });
});