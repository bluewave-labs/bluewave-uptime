"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapWithWarningOnCall = exports.buildWarning = void 0;
const buildWarning = (message, gravity = 'warning') => {
  let alreadyWarned = false;
  const cleanMessage = Array.isArray(message) ? message.join('\n') : message;
  return () => {
    if (!alreadyWarned) {
      alreadyWarned = true;
      if (gravity === 'error') {
        console.error(cleanMessage);
      } else {
        console.warn(cleanMessage);
      }
    }
  };
};
exports.buildWarning = buildWarning;
const wrapWithWarningOnCall = (method, message) => {
  if (process.env.NODE_ENV === 'production') {
    return method;
  }
  const warning = buildWarning(message);
  return (...args) => {
    warning();
    return method(...args);
  };
};
exports.wrapWithWarningOnCall = wrapWithWarningOnCall;