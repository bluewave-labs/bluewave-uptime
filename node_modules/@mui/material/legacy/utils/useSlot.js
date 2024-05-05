'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import useForkRef from '@mui/utils/useForkRef';
import { appendOwnerState, resolveComponentProps, mergeSlotProps } from '@mui/base/utils';
/**
 * An internal function to create a Material UI slot.
 *
 * This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
 * while Base UI does not need to support leaf component customization.
 *
 * @param {string} name: name of the slot
 * @param {object} parameters
 * @returns {[Slot, slotProps]} The slot's React component and the slot's props
 *
 * Note: the returned slot's props
 * - will never contain `component` prop.
 * - might contain `as` prop.
 */
export default function useSlot(
/**
 * The slot's name. All Material UI components should have `root` slot.
 *
 * If the name is `root`, the logic behaves differently from other slots,
 * e.g. the `externalForwardedProps` are spread to `root` slot but not other slots.
 */
name, parameters) {
  var className = parameters.className,
    initialElementType = parameters.elementType,
    ownerState = parameters.ownerState,
    externalForwardedProps = parameters.externalForwardedProps,
    getSlotOwnerState = parameters.getSlotOwnerState,
    internalForwardedProps = parameters.internalForwardedProps,
    useSlotPropsParams = _objectWithoutProperties(parameters, ["className", "elementType", "ownerState", "externalForwardedProps", "getSlotOwnerState", "internalForwardedProps"]);
  var rootComponent = externalForwardedProps.component,
    _externalForwardedPro = externalForwardedProps.slots,
    slots = _externalForwardedPro === void 0 ? _defineProperty({}, name, undefined) : _externalForwardedPro,
    _externalForwardedPro2 = externalForwardedProps.slotProps,
    slotProps = _externalForwardedPro2 === void 0 ? _defineProperty({}, name, undefined) : _externalForwardedPro2,
    other = _objectWithoutProperties(externalForwardedProps, ["component", "slots", "slotProps"]);
  var elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  var resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  var _mergeSlotProps = mergeSlotProps(_extends({
      className: className
    }, useSlotPropsParams, {
      externalForwardedProps: name === 'root' ? other : undefined,
      externalSlotProps: resolvedComponentsProps
    })),
    _mergeSlotProps$props = _mergeSlotProps.props,
    slotComponent = _mergeSlotProps$props.component,
    mergedProps = _objectWithoutProperties(_mergeSlotProps$props, ["component"]),
    internalRef = _mergeSlotProps.internalRef;
  var ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, parameters.ref);
  var slotOwnerState = getSlotOwnerState ? getSlotOwnerState(mergedProps) : {};
  var finalOwnerState = _extends({}, ownerState, slotOwnerState);
  var LeafComponent = name === 'root' ? slotComponent || rootComponent : slotComponent;
  var props = appendOwnerState(elementType, _extends({}, name === 'root' && !rootComponent && !slots[name] && internalForwardedProps, name !== 'root' && !slots[name] && internalForwardedProps, mergedProps, LeafComponent && {
    as: LeafComponent
  }, {
    ref: ref
  }), finalOwnerState);
  Object.keys(slotOwnerState).forEach(function (propName) {
    delete props[propName];
  });
  return [elementType, props];
}