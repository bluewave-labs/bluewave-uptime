"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _gridColumnGroupsSelector = require("./gridColumnGroupsSelector");
Object.keys(_gridColumnGroupsSelector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gridColumnGroupsSelector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridColumnGroupsSelector[key];
    }
  });
});