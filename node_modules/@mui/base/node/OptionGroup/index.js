"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  OptionGroup: true
};
Object.defineProperty(exports, "OptionGroup", {
  enumerable: true,
  get: function () {
    return _OptionGroup.OptionGroup;
  }
});
var _OptionGroup = require("./OptionGroup");
var _OptionGroup2 = require("./OptionGroup.types");
Object.keys(_OptionGroup2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _OptionGroup2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _OptionGroup2[key];
    }
  });
});
var _optionGroupClasses = require("./optionGroupClasses");
Object.keys(_optionGroupClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _optionGroupClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _optionGroupClasses[key];
    }
  });
});