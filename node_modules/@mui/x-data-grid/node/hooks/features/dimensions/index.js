"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _gridDimensionsSelectors = require("./gridDimensionsSelectors");
Object.keys(_gridDimensionsSelectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gridDimensionsSelectors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridDimensionsSelectors[key];
    }
  });
});