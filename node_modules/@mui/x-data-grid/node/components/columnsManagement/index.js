"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _GridColumnsManagement = require("./GridColumnsManagement");
Object.keys(_GridColumnsManagement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GridColumnsManagement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GridColumnsManagement[key];
    }
  });
});