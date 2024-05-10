"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _gridPaginationSelector = require("./gridPaginationSelector");
Object.keys(_gridPaginationSelector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gridPaginationSelector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridPaginationSelector[key];
    }
  });
});