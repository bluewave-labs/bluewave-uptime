"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLoggerFactory = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../../utils/utils");
var _utils2 = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const forceDebug = (0, _utils.localStorageAvailable)() && window.localStorage.getItem('DEBUG') != null;
const noop = () => {};
const noopLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop
};
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function getAppender(name, logLevel, appender = console) {
  const minLogLevelIdx = LOG_LEVELS.indexOf(logLevel);
  if (minLogLevelIdx === -1) {
    throw new Error(`MUI X: Log level ${logLevel} not recognized.`);
  }
  const logger = LOG_LEVELS.reduce((loggerObj, method, idx) => {
    if (idx >= minLogLevelIdx) {
      loggerObj[method] = (...args) => {
        const [message, ...other] = args;
        appender[method](`MUI X: ${name} - ${message}`, ...other);
      };
    } else {
      loggerObj[method] = noop;
    }
    return loggerObj;
  }, {});
  return logger;
}
const useGridLoggerFactory = (apiRef, props) => {
  const getLogger = React.useCallback(name => {
    if (forceDebug) {
      return getAppender(name, 'debug', props.logger);
    }
    if (!props.logLevel) {
      return noopLogger;
    }
    return getAppender(name, props.logLevel.toString(), props.logger);
  }, [props.logLevel, props.logger]);
  (0, _utils2.useGridApiMethod)(apiRef, {
    getLogger
  }, 'private');
};
exports.useGridLoggerFactory = useGridLoggerFactory;