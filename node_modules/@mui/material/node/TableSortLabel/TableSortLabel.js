"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _ArrowDownward = _interopRequireDefault(require("../internal/svg-icons/ArrowDownward"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _tableSortLabelClasses = _interopRequireWildcard(require("./tableSortLabelClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["active", "children", "className", "direction", "hideSortIcon", "IconComponent"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    direction,
    active
  } = ownerState;
  const slots = {
    root: ['root', active && 'active'],
    icon: ['icon', `iconDirection${(0, _capitalize.default)(direction)}`]
  };
  return (0, _composeClasses.default)(slots, _tableSortLabelClasses.getTableSortLabelUtilityClass, classes);
};
const TableSortLabelRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiTableSortLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.active && styles.active];
  }
})(({
  theme
}) => ({
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'flex-start',
  flexDirection: 'inherit',
  alignItems: 'center',
  '&:focus': {
    color: (theme.vars || theme).palette.text.secondary
  },
  '&:hover': {
    color: (theme.vars || theme).palette.text.secondary,
    [`& .${_tableSortLabelClasses.default.icon}`]: {
      opacity: 0.5
    }
  },
  [`&.${_tableSortLabelClasses.default.active}`]: {
    color: (theme.vars || theme).palette.text.primary,
    [`& .${_tableSortLabelClasses.default.icon}`]: {
      opacity: 1,
      color: (theme.vars || theme).palette.text.secondary
    }
  }
}));
const TableSortLabelIcon = (0, _styled.default)('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, styles[`iconDirection${(0, _capitalize.default)(ownerState.direction)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.shorter
  }),
  userSelect: 'none'
}, ownerState.direction === 'desc' && {
  transform: 'rotate(0deg)'
}, ownerState.direction === 'asc' && {
  transform: 'rotate(180deg)'
}));

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
const TableSortLabel = /*#__PURE__*/React.forwardRef(function TableSortLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTableSortLabel'
  });
  const {
      active = false,
      children,
      className,
      direction = 'asc',
      hideSortIcon = false,
      IconComponent = _ArrowDownward.default
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    active,
    direction,
    hideSortIcon,
    IconComponent
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TableSortLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    component: "span",
    disableRipple: true,
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [children, hideSortIcon && !active ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(TableSortLabelIcon, {
      as: IconComponent,
      className: (0, _clsx.default)(classes.icon),
      ownerState: ownerState
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TableSortLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: _propTypes.default.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction: _propTypes.default.oneOf(['asc', 'desc']),
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: _propTypes.default.bool,
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: _propTypes.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = TableSortLabel;