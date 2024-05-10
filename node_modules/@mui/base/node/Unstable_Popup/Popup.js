"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDom = require("@floating-ui/react-dom");
var _utils = require("@mui/utils");
var _composeClasses = require("../composeClasses");
var _Portal = require("../Portal");
var _utils2 = require("../utils");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _popupClasses = require("./popupClasses");
var _useTransition = require("../useTransition");
var _PopupContext = require("./PopupContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["anchor", "children", "container", "disablePortal", "keepMounted", "middleware", "offset", "open", "placement", "slotProps", "slots", "strategy"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useUtilityClasses(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ['root', open && 'open']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_popupClasses.getPopupUtilityClass));
}
function resolveAnchor(anchor) {
  return typeof anchor === 'function' ? anchor() : anchor;
}

/**
 *
 * Demos:
 *
 * - [Popup](https://mui.com/base-ui/react-popup/)
 *
 * API:
 *
 * - [Popup API](https://mui.com/base-ui/react-popup/components-api/#popup)
 */
const Popup = exports.Popup = /*#__PURE__*/React.forwardRef(function Popup(props, forwardedRef) {
  var _slots$root;
  const {
      anchor: anchorProp,
      children,
      container,
      disablePortal = false,
      keepMounted = false,
      middleware,
      offset: offsetProp = 0,
      open = false,
      placement = 'bottom',
      slotProps = {},
      slots = {},
      strategy = 'absolute'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    refs,
    elements,
    floatingStyles,
    update,
    placement: finalPlacement
  } = (0, _reactDom.useFloating)({
    elements: {
      reference: resolveAnchor(anchorProp)
    },
    open,
    middleware: middleware != null ? middleware : [(0, _reactDom.offset)(offsetProp != null ? offsetProp : 0), (0, _reactDom.flip)(), (0, _reactDom.shift)()],
    placement,
    strategy,
    whileElementsMounted: !keepMounted ? _reactDom.autoUpdate : undefined
  });
  const handleRef = (0, _utils.unstable_useForkRef)(refs.setFloating, forwardedRef);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (keepMounted && open && elements.reference && elements.floating) {
      const cleanup = (0, _reactDom.autoUpdate)(elements.reference, elements.floating, update);
      return cleanup;
    }
    return undefined;
  }, [keepMounted, open, elements, update]);
  const ownerState = (0, _extends2.default)({}, props, {
    disablePortal,
    keepMounted,
    offset: _reactDom.offset,
    open,
    placement,
    finalPlacement,
    strategy
  });
  const {
    contextValue,
    hasExited: hasTransitionExited
  } = (0, _useTransition.useTransitionTrigger)(open);
  const visibility = keepMounted && hasTransitionExited ? 'hidden' : undefined;
  const classes = useUtilityClasses(ownerState);
  const Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : 'div';
  const rootProps = (0, _utils2.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      role: 'tooltip',
      style: (0, _extends2.default)({}, floatingStyles, {
        visibility
      })
    }
  });
  const popupContextValue = React.useMemo(() => ({
    placement: finalPlacement
  }), [finalPlacement]);
  const shouldRender = keepMounted || !hasTransitionExited;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Portal.Portal, {
    disablePortal: disablePortal,
    container: container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopupContext.PopupContext.Provider, {
      value: popupContextValue,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_useTransition.TransitionContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
          children: children
        }))
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? Popup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtual element](https://floating-ui.com/docs/virtual-elements),
   * or a function that returns either.
   * It's used to set the position of the popup.
   */
  anchor: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_utils.HTMLElementType, _propTypes.default.object, _propTypes.default.func]),
  /**
   * @ignore
   */
  children: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
   * By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_utils.HTMLElementType, _propTypes.default.func]),
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal: _propTypes.default.bool,
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `visibility` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted: _propTypes.default.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.oneOf([false]), _propTypes.default.shape({
    fn: _propTypes.default.func.isRequired,
    name: _propTypes.default.string.isRequired,
    options: _propTypes.default.any
  })])),
  /**
   * Distance between a popup and the trigger element.
   * This prop is ignored when custom `middleware` is provided.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number, _propTypes.default.shape({
    alignmentAxis: _propTypes.default.number,
    crossAxis: _propTypes.default.number,
    mainAxis: _propTypes.default.number
  })]),
  /**
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open: _propTypes.default.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  }),
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy: _propTypes.default.oneOf(['absolute', 'fixed'])
} : void 0;