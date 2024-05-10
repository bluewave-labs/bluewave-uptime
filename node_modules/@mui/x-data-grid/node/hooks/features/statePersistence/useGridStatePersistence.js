"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridStatePersistence = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useGridStatePersistence = apiRef => {
  const exportState = React.useCallback((params = {}) => {
    const stateToExport = apiRef.current.unstable_applyPipeProcessors('exportState', {}, params);
    return stateToExport;
  }, [apiRef]);
  const restoreState = React.useCallback(stateToRestore => {
    const response = apiRef.current.unstable_applyPipeProcessors('restoreState', {
      callbacks: []
    }, {
      stateToRestore
    });
    response.callbacks.forEach(callback => {
      callback();
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const statePersistenceApi = {
    exportState,
    restoreState
  };
  (0, _utils.useGridApiMethod)(apiRef, statePersistenceApi, 'public');
};
exports.useGridStatePersistence = useGridStatePersistence;