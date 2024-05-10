"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ClickAwayListener = require("./ClickAwayListener");
Object.keys(_ClickAwayListener).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ClickAwayListener[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ClickAwayListener[key];
    }
  });
});