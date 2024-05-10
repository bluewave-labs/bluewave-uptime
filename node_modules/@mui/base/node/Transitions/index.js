"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CssAnimation = require("./CssAnimation");
Object.keys(_CssAnimation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CssAnimation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CssAnimation[key];
    }
  });
});
var _CssTransition = require("./CssTransition");
Object.keys(_CssTransition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CssTransition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CssTransition[key];
    }
  });
});