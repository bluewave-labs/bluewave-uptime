"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _overrides = require("./overrides");
Object.keys(_overrides).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _overrides[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _overrides[key];
    }
  });
});
var _props = require("./props");
Object.keys(_props).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _props[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _props[key];
    }
  });
});