"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDensity = exports.densityStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _useGridLogger = require("../../utils/useGridLogger");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _densitySelector = require("./densitySelector");
var _pipeProcessing = require("../../core/pipeProcessing");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const densityStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  density: props.initialState?.density ?? props.density ?? 'standard'
});
exports.densityStateInitializer = densityStateInitializer;
const useGridDensity = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useDensity');
  apiRef.current.registerControlState({
    stateId: 'density',
    propModel: props.density,
    propOnChange: props.onDensityChange,
    stateSelector: _densitySelector.gridDensitySelector,
    changeEvent: 'densityChange'
  });
  const setDensity = (0, _useEventCallback.default)(newDensity => {
    const currentDensity = (0, _densitySelector.gridDensitySelector)(apiRef.current.state);
    if (currentDensity === newDensity) {
      return;
    }
    logger.debug(`Set grid density to ${newDensity}`);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      density: newDensity
    }));
  });
  const densityApi = {
    setDensity
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, densityApi, 'public');
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const exportedDensity = (0, _densitySelector.gridDensitySelector)(apiRef.current.state);
    const shouldExportRowCount =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the `density` is controlled
    props.density != null ||
    // Always export if the `density` has been initialized
    props.initialState?.density != null;
    if (!shouldExportRowCount) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      density: exportedDensity
    });
  }, [apiRef, props.density, props.initialState?.density]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const restoredDensity = context.stateToRestore?.density ? context.stateToRestore.density : (0, _densitySelector.gridDensitySelector)(apiRef.current.state);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      density: restoredDensity
    }));
    return params;
  }, [apiRef]);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);
  React.useEffect(() => {
    if (props.density) {
      apiRef.current.setDensity(props.density);
    }
  }, [apiRef, props.density]);
};
exports.useGridDensity = useGridDensity;