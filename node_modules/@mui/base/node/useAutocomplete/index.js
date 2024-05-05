"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useAutocomplete = require("./useAutocomplete");
Object.keys(_useAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useAutocomplete[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useAutocomplete[key];
    }
  });
});