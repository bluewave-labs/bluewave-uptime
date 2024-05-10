"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Badge: true
};
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () {
    return _Badge.Badge;
  }
});
var _Badge = require("./Badge");
var _Badge2 = require("./Badge.types");
Object.keys(_Badge2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Badge2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Badge2[key];
    }
  });
});
var _badgeClasses = require("./badgeClasses");
Object.keys(_badgeClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _badgeClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _badgeClasses[key];
    }
  });
});