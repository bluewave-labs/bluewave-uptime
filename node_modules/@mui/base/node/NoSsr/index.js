"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NoSsr: true
};
Object.defineProperty(exports, "NoSsr", {
  enumerable: true,
  get: function () {
    return _NoSsr.NoSsr;
  }
});
var _NoSsr = require("./NoSsr");
var _NoSsr2 = require("./NoSsr.types");
Object.keys(_NoSsr2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NoSsr2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NoSsr2[key];
    }
  });
});