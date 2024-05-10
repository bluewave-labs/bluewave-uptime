"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Slider: true
};
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () {
    return _Slider.Slider;
  }
});
var _Slider = require("./Slider");
var _Slider2 = require("./Slider.types");
Object.keys(_Slider2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Slider2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Slider2[key];
    }
  });
});
var _sliderClasses = require("./sliderClasses");
Object.keys(_sliderClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sliderClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sliderClasses[key];
    }
  });
});