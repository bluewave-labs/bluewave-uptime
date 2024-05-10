"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useBadge: true
};
Object.defineProperty(exports, "useBadge", {
  enumerable: true,
  get: function () {
    return _useBadge.useBadge;
  }
});
var _useBadge = require("./useBadge");
var _useBadge2 = require("./useBadge.types");
Object.keys(_useBadge2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useBadge2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBadge2[key];
    }
  });
});