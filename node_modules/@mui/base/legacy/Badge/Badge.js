'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useBadge } from '../useBadge';
import { getBadgeUtilityClass } from './badgeClasses';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var invisible = ownerState.invisible;
  var slots = {
    root: ['root'],
    badge: ['badge', invisible && 'invisible']
  };
  return composeClasses(slots, useClassNamesOverride(getBadgeUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/base-ui/react-badge/components-api/#badge)
 */
var Badge = /*#__PURE__*/React.forwardRef(function Badge(props, forwardedRef) {
  var _slots$root, _slots$badge;
  var badgeContentProp = props.badgeContent,
    children = props.children,
    invisibleProp = props.invisible,
    _props$max = props.max,
    maxProp = _props$max === void 0 ? 99 : _props$max,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$showZero = props.showZero,
    showZero = _props$showZero === void 0 ? false : _props$showZero,
    other = _objectWithoutProperties(props, ["badgeContent", "children", "invisible", "max", "slotProps", "slots", "showZero"]);
  var _useBadge = useBadge(_extends({}, props, {
      max: maxProp
    })),
    badgeContent = _useBadge.badgeContent,
    max = _useBadge.max,
    displayValue = _useBadge.displayValue,
    invisible = _useBadge.invisible;
  var ownerState = _extends({}, props, {
    badgeContent: badgeContent,
    invisible: invisible,
    max: max,
    showZero: showZero
  });
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'span';
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: classes.root
  });
  var BadgeComponent = (_slots$badge = slots.badge) != null ? _slots$badge : 'span';
  var badgeProps = useSlotProps({
    elementType: BadgeComponent,
    externalSlotProps: slotProps.badge,
    ownerState: ownerState,
    className: classes.badge
  });
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [children, /*#__PURE__*/_jsx(BadgeComponent, _extends({}, badgeProps, {
      children: displayValue
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? Badge.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    badge: PropTypes.elementType,
    root: PropTypes.elementType
  })
} : void 0;
export { Badge };