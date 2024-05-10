"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDefaultReduceAnimations = exports.slowAnimationDevices = void 0;
var _useMediaQuery = _interopRequireDefault(require("@mui/material/useMediaQuery"));
const PREFERS_REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

// detect if user agent has Android version < 10 or iOS version < 13
const mobileVersionMatches = typeof navigator !== 'undefined' && navigator.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
const androidVersion = mobileVersionMatches && mobileVersionMatches[1] ? parseInt(mobileVersionMatches[1], 10) : null;
const iOSVersion = mobileVersionMatches && mobileVersionMatches[2] ? parseInt(mobileVersionMatches[2], 10) : null;
const slowAnimationDevices = exports.slowAnimationDevices = androidVersion && androidVersion < 10 || iOSVersion && iOSVersion < 13 || false;
const useDefaultReduceAnimations = () => {
  const prefersReduced = (0, _useMediaQuery.default)(PREFERS_REDUCED_MOTION, {
    defaultMatches: false
  });
  return prefersReduced || slowAnimationDevices;
};
exports.useDefaultReduceAnimations = useDefaultReduceAnimations;