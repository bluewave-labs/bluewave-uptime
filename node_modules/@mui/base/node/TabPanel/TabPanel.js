"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
var _composeClasses = require("../composeClasses");
var _tabPanelClasses = require("./tabPanelClasses");
var _useTabPanel = require("../useTabPanel/useTabPanel");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "value", "slotProps", "slots"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    hidden
  } = ownerState;
  const slots = {
    root: ['root', hidden && 'hidden']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_tabPanelClasses.getTabPanelUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://mui.com/base-ui/react-tabs/components-api/#tab-panel)
 */
const TabPanel = exports.TabPanel = /*#__PURE__*/React.forwardRef(function TabPanel(props, forwardedRef) {
  var _slots$root;
  const {
      children,
      slotProps = {},
      slots = {}
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    hidden,
    getRootProps
  } = (0, _useTabPanel.useTabPanel)(props);
  const ownerState = (0, _extends2.default)({}, props, {
    hidden
  });
  const classes = useUtilityClasses(ownerState);
  const TabPanelRoot = (_slots$root = slots.root) != null ? _slots$root : 'div';
  const tabPanelRootProps = (0, _utils.useSlotProps)({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tabpanel',
      ref: forwardedRef
    },
    ownerState,
    className: classes.root
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TabPanelRoot, (0, _extends2.default)({}, tabPanelRootProps, {
    children: !hidden && children
  }));
});
process.env.NODE_ENV !== "production" ? TabPanel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  }),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : void 0;