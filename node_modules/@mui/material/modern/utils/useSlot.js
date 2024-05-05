'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "elementType", "ownerState", "externalForwardedProps", "getSlotOwnerState", "internalForwardedProps"],
  _excluded2 = ["component", "slots", "slotProps"],
  _excluded3 = ["component"];
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
  const {
      className,
      elementType: initialElementType,
      ownerState,
      externalForwardedProps,
      getSlotOwnerState,
      internalForwardedProps
    } = parameters,
    useSlotPropsParams = _objectWithoutPropertiesLoose(parameters, _excluded);
  const {
      component: rootComponent,
      slots = {
        [name]: undefined
      },
      slotProps = {
        [name]: undefined
      }
    } = externalForwardedProps,
    other = _objectWithoutPropertiesLoose(externalForwardedProps, _excluded2);
  const elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  const _mergeSlotProps = mergeSlotProps(_extends({
      className
    }, useSlotPropsParams, {
      externalForwardedProps: name === 'root' ? other : undefined,
      externalSlotProps: resolvedComponentsProps
    })),
    {
      props: {
        component: slotComponent
      },
      internalRef
    } = _mergeSlotProps,
    mergedProps = _objectWithoutPropertiesLoose(_mergeSlotProps.props, _excluded3);
  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
  const slotOwnerState = getSlotOwnerState ? getSlotOwnerState(mergedProps) : {};
  const finalOwnerState = _extends({}, ownerState, slotOwnerState);
  const LeafComponent = name === 'root' ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState(elementType, _extends({}, name === 'root' && !rootComponent && !slots[name] && internalForwardedProps, name !== 'root' && !slots[name] && internalForwardedProps, mergedProps, LeafComponent && {
    as: LeafComponent
  }, {
    ref
  }), finalOwnerState);
  Object.keys(slotOwnerState).forEach(propName => {
    delete props[propName];
  });
  return [elementType, props];
}