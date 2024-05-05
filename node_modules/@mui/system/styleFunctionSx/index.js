"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _styleFunctionSx.default;
  }
});
Object.defineProperty(exports, "extendSxProp", {
  enumerable: true,
  get: function () {
    return _extendSxProp.default;
  }
});
Object.defineProperty(exports, "unstable_createStyleFunctionSx", {
  enumerable: true,
  get: function () {
    return _styleFunctionSx.unstable_createStyleFunctionSx;
  }
});
Object.defineProperty(exports, "unstable_defaultSxConfig", {
  enumerable: true,
  get: function () {
    return _defaultSxConfig.default;
  }
});
var _styleFunctionSx = _interopRequireWildcard(require("./styleFunctionSx"));
var _extendSxProp = _interopRequireDefault(require("./extendSxProp"));
var _defaultSxConfig = _interopRequireDefault(require("./defaultSxConfig"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }