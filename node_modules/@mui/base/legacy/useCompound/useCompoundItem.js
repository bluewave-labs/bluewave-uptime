'use client';

import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { CompoundComponentContext } from './useCompoundParent';
/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 *   This can be either a value, or a function that generates a value based on already registered siblings' ids.
 *   If a function, it's called with the set of the ids of all the items that have already been registered.
 *   Return `existingKeys.size` if you want to use the index of the new item as the id.
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (for example a memoized object), to avoid unnecessary re-registrations.
 *
 * @ignore - internal hook.
 */
export function useCompoundItem(id, itemMetadata) {
  var context = React.useContext(CompoundComponentContext);
  if (context === null) {
    throw new Error('useCompoundItem must be used within a useCompoundParent');
  }
  var registerItem = context.registerItem;
  var _React$useState = React.useState(typeof id === 'function' ? undefined : id),
    registeredId = _React$useState[0],
    setRegisteredId = _React$useState[1];
  useEnhancedEffect(function () {
    var _registerItem = registerItem(id, itemMetadata),
      returnedId = _registerItem.id,
      deregister = _registerItem.deregister;
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);
  return {
    id: registeredId,
    index: registeredId !== undefined ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount
  };
}