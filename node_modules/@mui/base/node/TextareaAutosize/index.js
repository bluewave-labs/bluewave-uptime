"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TextareaAutosize: true
};
Object.defineProperty(exports, "TextareaAutosize", {
  enumerable: true,
  get: function () {
    return _TextareaAutosize.TextareaAutosize;
  }
});
var _TextareaAutosize = require("./TextareaAutosize");
var _TextareaAutosize2 = require("./TextareaAutosize.types");
Object.keys(_TextareaAutosize2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TextareaAutosize2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TextareaAutosize2[key];
    }
  });
});