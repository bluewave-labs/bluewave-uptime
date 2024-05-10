"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPreferencesPanel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _gridPreferencePanelSelector = require("../../hooks/features/preferencesPanel/gridPreferencePanelSelector");
var _gridPreferencePanelsValue = require("../../hooks/features/preferencesPanel/gridPreferencePanelsValue");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridPreferencesPanel = exports.GridPreferencesPanel = /*#__PURE__*/React.forwardRef(function GridPreferencesPanel(props, ref) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const columns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnDefinitionsSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const preferencePanelState = (0, _useGridSelector.useGridSelector)(apiRef, _gridPreferencePanelSelector.gridPreferencePanelStateSelector);
  const panelContent = apiRef.current.unstable_applyPipeProcessors('preferencePanel', null, preferencePanelState.openedPanelValue ?? _gridPreferencePanelsValue.GridPreferencePanelsValue.filters);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.panel, (0, _extends2.default)({
    ref: ref,
    as: rootProps.slots.basePopper,
    open: columns.length > 0 && preferencePanelState.open,
    id: preferencePanelState.panelId,
    "aria-labelledby": preferencePanelState.labelId
  }, rootProps.slotProps?.panel, props, rootProps.slotProps?.basePopper, {
    children: panelContent
  }));
});