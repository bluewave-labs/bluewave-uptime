"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMPTY_RENDER_CONTEXT = void 0;
exports.useGridVirtualization = useGridVirtualization;
exports.virtualizationStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_RENDER_CONTEXT = exports.EMPTY_RENDER_CONTEXT = {
  firstRowIndex: 0,
  lastRowIndex: 0,
  firstColumnIndex: 0,
  lastColumnIndex: 0
};
const virtualizationStateInitializer = (state, props) => {
  const virtualization = {
    enabled: !props.disableVirtualization,
    enabledForColumns: true,
    renderContext: EMPTY_RENDER_CONTEXT
  };
  return (0, _extends2.default)({}, state, {
    virtualization
  });
};
exports.virtualizationStateInitializer = virtualizationStateInitializer;
function useGridVirtualization(apiRef, props) {
  /*
   * API METHODS
   */

  const setVirtualization = enabled => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      virtualization: (0, _extends2.default)({}, state.virtualization, {
        enabled
      })
    }));
  };
  const setColumnVirtualization = enabled => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      virtualization: (0, _extends2.default)({}, state.virtualization, {
        enabledForColumns: enabled
      })
    }));
  };
  const api = {
    unstable_setVirtualization: setVirtualization,
    unstable_setColumnVirtualization: setColumnVirtualization
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, api, 'public');

  /*
   * EFFECTS
   */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setVirtualization(!props.disableVirtualization);
  }, [props.disableVirtualization]);
  /* eslint-enable react-hooks/exhaustive-deps */
}