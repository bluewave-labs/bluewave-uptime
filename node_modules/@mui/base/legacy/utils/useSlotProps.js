'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { appendOwnerState } from './appendOwnerState';
import { mergeSlotProps } from './mergeSlotProps';
import { resolveComponentProps } from './resolveComponentProps';
/**
 * @ignore - do not document.
 * Builds the props to be passed into the slot of an unstyled component.
 * It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
 * If the slot component is not a host component, it also merges in the `ownerState`.
 *
 * @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
 */
export function useSlotProps(parameters) {
  var _parameters$additiona;
  var elementType = parameters.elementType,
    externalSlotProps = parameters.externalSlotProps,
    ownerState = parameters.ownerState,
    _parameters$skipResol = parameters.skipResolvingSlotProps,
    skipResolvingSlotProps = _parameters$skipResol === void 0 ? false : _parameters$skipResol,
    rest = _objectWithoutProperties(parameters, ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"]);
  var resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  var _mergeSlotProps = mergeSlotProps(_extends({}, rest, {
      externalSlotProps: resolvedComponentsProps
    })),
    mergedProps = _mergeSlotProps.props,
    internalRef = _mergeSlotProps.internalRef;
  var ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  var props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref: ref
  }), ownerState);
  return props;
}