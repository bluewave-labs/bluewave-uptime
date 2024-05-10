'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { HTMLElementType, unstable_useEnhancedEffect as useEnhancedEffect, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { Portal } from '../Portal';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getPopupUtilityClass } from './popupClasses';
import { useTransitionTrigger, TransitionContext } from '../useTransition';
import { PopupContext } from './PopupContext';
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  var open = ownerState.open;
  var slots = {
    root: ['root', open && 'open']
  };
  return composeClasses(slots, useClassNamesOverride(getPopupUtilityClass));
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
var Popup = /*#__PURE__*/React.forwardRef(function Popup(props, forwardedRef) {
  var _slots$root;
  var anchorProp = props.anchor,
    children = props.children,
    container = props.container,
    _props$disablePortal = props.disablePortal,
    disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
    _props$keepMounted = props.keepMounted,
    keepMounted = _props$keepMounted === void 0 ? false : _props$keepMounted,
    middleware = props.middleware,
    _props$offset = props.offset,
    offsetProp = _props$offset === void 0 ? 0 : _props$offset,
    _props$open = props.open,
    open = _props$open === void 0 ? false : _props$open,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottom' : _props$placement,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$strategy = props.strategy,
    strategy = _props$strategy === void 0 ? 'absolute' : _props$strategy,
    other = _objectWithoutProperties(props, ["anchor", "children", "container", "disablePortal", "keepMounted", "middleware", "offset", "open", "placement", "slotProps", "slots", "strategy"]);
  var _useFloating = useFloating({
      elements: {
        reference: resolveAnchor(anchorProp)
      },
      open: open,
      middleware: middleware != null ? middleware : [offset(offsetProp != null ? offsetProp : 0), flip(), shift()],
      placement: placement,
      strategy: strategy,
      whileElementsMounted: !keepMounted ? autoUpdate : undefined
    }),
    refs = _useFloating.refs,
    elements = _useFloating.elements,
    floatingStyles = _useFloating.floatingStyles,
    update = _useFloating.update,
    finalPlacement = _useFloating.placement;
  var handleRef = useForkRef(refs.setFloating, forwardedRef);
  useEnhancedEffect(function () {
    if (keepMounted && open && elements.reference && elements.floating) {
      var cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
    return undefined;
  }, [keepMounted, open, elements, update]);
  var ownerState = _extends({}, props, {
    disablePortal: disablePortal,
    keepMounted: keepMounted,
    offset: offset,
    open: open,
    placement: placement,
    finalPlacement: finalPlacement,
    strategy: strategy
  });
  var _useTransitionTrigger = useTransitionTrigger(open),
    contextValue = _useTransitionTrigger.contextValue,
    hasTransitionExited = _useTransitionTrigger.hasExited;
  var visibility = keepMounted && hasTransitionExited ? 'hidden' : undefined;
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState: ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      role: 'tooltip',
      style: _extends({}, floatingStyles, {
        visibility: visibility
      })
    }
  });
  var popupContextValue = React.useMemo(function () {
    return {
      placement: finalPlacement
    };
  }, [finalPlacement]);
  var shouldRender = keepMounted || !hasTransitionExited;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(Portal, {
    disablePortal: disablePortal,
    container: container,
    children: /*#__PURE__*/_jsx(PopupContext.Provider, {
      value: popupContextValue,
      children: /*#__PURE__*/_jsx(TransitionContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
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
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
  /**
   * @ignore
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
   * By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `visibility` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.shape({
    fn: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.any
  })])),
  /**
   * Distance between a popup and the trigger element.
   * This prop is ignored when custom `middleware` is provided.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.number, PropTypes.shape({
    alignmentAxis: PropTypes.number,
    crossAxis: PropTypes.number,
    mainAxis: PropTypes.number
  })]),
  /**
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy: PropTypes.oneOf(['absolute', 'fixed'])
} : void 0;
export { Popup };