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
var _integerPropType = _interopRequireDefault(require("@mui/utils/integerPropType"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _imageListClasses = require("./imageListClasses");
var _ImageListContext = _interopRequireDefault(require("./ImageListContext"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "className", "cols", "component", "rowHeight", "gap", "style", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant]
  };
  return (0, _composeClasses.default)(slots, _imageListClasses.getImageListUtilityClass, classes);
};
const ImageListRoot = (0, _styled.default)('ul', {
  name: 'MuiImageList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant]];
  }
})(({
  ownerState
}) => {
  return (0, _extends2.default)({
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch'
  }, ownerState.variant === 'masonry' && {
    display: 'block'
  });
});
const ImageList = /*#__PURE__*/React.forwardRef(function ImageList(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiImageList'
  });
  const {
      children,
      className,
      cols = 2,
      component = 'ul',
      rowHeight = 'auto',
      gap = 4,
      style: styleProp,
      variant = 'standard'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const contextValue = React.useMemo(() => ({
    rowHeight,
    gap,
    variant
  }), [rowHeight, gap, variant]);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (document !== undefined && 'objectFit' in document.documentElement.style === false) {
        console.error(['MUI: ImageList v5+ no longer natively supports Internet Explorer.', 'Use v4 of this component instead, or polyfill CSS object-fit.'].join('\n'));
      }
    }
  }, []);
  const style = variant === 'masonry' ? (0, _extends2.default)({
    columnCount: cols,
    columnGap: gap
  }, styleProp) : (0, _extends2.default)({
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap
  }, styleProp);
  const ownerState = (0, _extends2.default)({}, props, {
    component,
    gap,
    rowHeight,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, classes[variant], className),
    ref: ref,
    style: style,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageListContext.default.Provider, {
      value: contextValue,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? ImageList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `ImageListItem`s.
   */
  children: _propTypes.default /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Number of columns.
   * @default 2
   */
  cols: _integerPropType.default,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * The gap between items in px.
   * @default 4
   */
  gap: _propTypes.default.number,
  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),
  /**
   * @ignore
   */
  style: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['masonry', 'quilted', 'standard', 'woven']), _propTypes.default.string])
} : void 0;
var _default = exports.default = ImageList;