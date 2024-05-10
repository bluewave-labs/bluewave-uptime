"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRegisterPipeApplier = void 0;
var React = _interopRequireWildcard(require("react"));
var _useFirstRender = require("../../utils/useFirstRender");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useGridRegisterPipeApplier = (apiRef, group, callback) => {
  const cleanup = React.useRef();
  const id = React.useRef(`mui-${Math.round(Math.random() * 1e9)}`);
  const registerPreProcessor = React.useCallback(() => {
    cleanup.current = apiRef.current.registerPipeApplier(group, id.current, callback);
  }, [apiRef, callback, group]);
  (0, _useFirstRender.useFirstRender)(() => {
    registerPreProcessor();
  });
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      registerPreProcessor();
    }
    return () => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = null;
      }
    };
  }, [registerPreProcessor]);
};
exports.useGridRegisterPipeApplier = useGridRegisterPipeApplier;