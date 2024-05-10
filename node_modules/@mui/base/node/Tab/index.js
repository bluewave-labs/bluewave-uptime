"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Tab: true
};
Object.defineProperty(exports, "Tab", {
  enumerable: true,
  get: function () {
    return _Tab.Tab;
  }
});
var _Tab = require("./Tab");
var _Tab2 = require("./Tab.types");
Object.keys(_Tab2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Tab2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Tab2[key];
    }
  });
});
var _tabClasses = require("./tabClasses");
Object.keys(_tabClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabClasses[key];
    }
  });
});