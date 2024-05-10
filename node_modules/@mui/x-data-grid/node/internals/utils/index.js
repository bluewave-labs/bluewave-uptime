"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _computeSlots = require("./computeSlots");
Object.keys(_computeSlots).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _computeSlots[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _computeSlots[key];
    }
  });
});
var _useProps = require("./useProps");
Object.keys(_useProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useProps[key];
    }
  });
});
var _propValidation = require("./propValidation");
Object.keys(_propValidation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propValidation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propValidation[key];
    }
  });
});