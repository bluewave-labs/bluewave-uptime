"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _scrollLeft = require("./scrollLeft");
Object.keys(_scrollLeft).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _scrollLeft[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scrollLeft[key];
    }
  });
});