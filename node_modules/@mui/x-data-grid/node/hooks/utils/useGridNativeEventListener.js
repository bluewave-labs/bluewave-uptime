"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridNativeEventListener = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../../utils/utils");
var _useGridLogger = require("./useGridLogger");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useGridNativeEventListener = (apiRef, ref, eventName, handler, options) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useNativeEventListener');
  const [added, setAdded] = React.useState(false);
  const handlerRef = React.useRef(handler);
  const targetElement = (0, _utils.isFunction)(ref) ? ref() : ref?.current ?? null;
  const wrapHandler = React.useCallback(event => {
    return handlerRef.current && handlerRef.current(event);
  }, []);
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  React.useEffect(() => {
    if (targetElement && eventName && !added) {
      logger.debug(`Binding native ${eventName} event`);
      targetElement.addEventListener(eventName, wrapHandler, options);
      setAdded(true);
      const unsubscribe = () => {
        logger.debug(`Clearing native ${eventName} event`);
        targetElement.removeEventListener(eventName, wrapHandler, options);
      };
      apiRef.current.subscribeEvent('unmount', unsubscribe);
    }
  }, [targetElement, wrapHandler, eventName, added, logger, options, apiRef]);
};
exports.useGridNativeEventListener = useGridNativeEventListener;