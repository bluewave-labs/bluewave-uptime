import * as React from 'react';
import { useLazyRef } from './useLazyRef';
import { useOnMount } from './useOnMount';
import { buildWarning } from '../../utils/warning';
import { fastObjectShallowCompare } from '../../utils/fastObjectShallowCompare';
const stateNotInitializedWarning = buildWarning(['MUI X: `useGridSelector` has been called before the initialization of the state.', 'This hook can only be used inside the context of the grid.']);
function isOutputSelector(selector) {
  return selector.acceptsApiRef;
}
function applySelector(apiRef, selector) {
  if (isOutputSelector(selector)) {
    return selector(apiRef);
  }
  return selector(apiRef.current.state);
}
const defaultCompare = Object.is;
export const objectShallowCompare = fastObjectShallowCompare;
const createRefs = () => ({
  state: null,
  equals: null,
  selector: null
});
export const useGridSelector = (apiRef, selector, equals = defaultCompare) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!apiRef.current.state) {
      stateNotInitializedWarning();
    }
  }
  const refs = useLazyRef(createRefs);
  const didInit = refs.current.selector !== null;
  const [state, setState] = React.useState(
  // We don't use an initialization function to avoid allocations
  didInit ? null : applySelector(apiRef, selector));
  refs.current.state = state;
  refs.current.equals = equals;
  refs.current.selector = selector;
  useOnMount(() => {
    return apiRef.current.store.subscribe(() => {
      const newState = applySelector(apiRef, refs.current.selector);
      if (!refs.current.equals(refs.current.state, newState)) {
        refs.current.state = newState;
        setState(newState);
      }
    });
  });
  return state;
};