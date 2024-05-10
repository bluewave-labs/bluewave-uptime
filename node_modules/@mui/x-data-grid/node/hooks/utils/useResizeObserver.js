"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResizeObserver = useResizeObserver;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const isDevEnvironment = process.env.NODE_ENV === 'development';
const noop = () => {};
function useResizeObserver(ref, fn, enabled) {
  const fnRef = React.useRef(null);
  fnRef.current = fn;
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (enabled === false || typeof ResizeObserver === 'undefined') {
      return noop;
    }
    let frameID = 0;
    const target = ref.current;
    const observer = new ResizeObserver(entries => {
      // See https://github.com/mui/mui-x/issues/8733
      // In dev, we avoid the React warning by moving the task to the next frame.
      // In prod, we want the task to run in the same frame as to avoid tear.
      if (isDevEnvironment) {
        frameID = requestAnimationFrame(() => {
          fnRef.current(entries);
        });
      } else {
        fnRef.current(entries);
      }
    });
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (frameID) {
        cancelAnimationFrame(frameID);
      }
      observer.disconnect();
    };
  }, [ref, enabled]);
}