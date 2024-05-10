"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Modal: true
};
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function () {
    return _Modal.Modal;
  }
});
var _Modal = require("./Modal");
var _Modal2 = require("./Modal.types");
Object.keys(_Modal2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Modal2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Modal2[key];
    }
  });
});
var _modalClasses = require("./modalClasses");
Object.keys(_modalClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _modalClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _modalClasses[key];
    }
  });
});