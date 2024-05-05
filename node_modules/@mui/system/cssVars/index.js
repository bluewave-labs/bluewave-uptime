"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createCssVarsTheme", {
  enumerable: true,
  get: function () {
    return _createCssVarsTheme.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _createCssVarsProvider.default;
  }
});
Object.defineProperty(exports, "getInitColorSchemeScript", {
  enumerable: true,
  get: function () {
    return _getInitColorSchemeScript.default;
  }
});
Object.defineProperty(exports, "prepareCssVars", {
  enumerable: true,
  get: function () {
    return _prepareCssVars.default;
  }
});
var _createCssVarsProvider = _interopRequireDefault(require("./createCssVarsProvider"));
var _getInitColorSchemeScript = _interopRequireDefault(require("./getInitColorSchemeScript"));
var _prepareCssVars = _interopRequireDefault(require("./prepareCssVars"));
var _createCssVarsTheme = _interopRequireDefault(require("./createCssVarsTheme"));