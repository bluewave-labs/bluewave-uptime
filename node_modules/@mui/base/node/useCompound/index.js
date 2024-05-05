"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useCompoundParent = require("./useCompoundParent");
Object.keys(_useCompoundParent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCompoundParent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCompoundParent[key];
    }
  });
});
var _useCompoundItem = require("./useCompoundItem");
Object.keys(_useCompoundItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCompoundItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCompoundItem[key];
    }
  });
});