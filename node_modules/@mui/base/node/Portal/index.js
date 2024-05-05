"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Portal: true
};
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function () {
    return _Portal.Portal;
  }
});
var _Portal = require("./Portal");
var _Portal2 = require("./Portal.types");
Object.keys(_Portal2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Portal2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Portal2[key];
    }
  });
});