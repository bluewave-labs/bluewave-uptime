'use client';

import * as React from 'react';
export const CompoundComponentContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  CompoundComponentContext.displayName = 'CompoundComponentContext';
}
/**
 * Sorts the subitems by their position in the DOM.
 */
function sortSubitems(subitems) {
  const subitemsArray = Array.from(subitems.keys()).map(key => {
    const subitem = subitems.get(key);
    return {
      key,
      subitem
    };
  });
  subitemsArray.sort((a, b) => {
    const aNode = a.subitem.ref.current;
    const bNode = b.subitem.ref.current;
    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }

    // eslint-disable-next-line no-bitwise
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });
  return new Map(subitemsArray.map(item => [item.key, item.subitem]));
}

/**
 * Provides a way for a component to know about its children.
 *
 * Child components register themselves with the `useCompoundItem` hook, passing in arbitrary metadata to the parent.
 *
 * This is a more powerful altervantive to `children` traversal, as child components don't have to be placed
 * directly inside the parent component. They can be anywhere in the tree (and even rendered by other components).
 *
 * The downside is that this doesn't work with SSR as it relies on the useEffect hook.
 *
 * @ignore - internal hook.
 */
export function useCompoundParent() {
  const [subitems, setSubitems] = React.useState(new Map());
  const subitemKeys = React.useRef(new Set());
  const deregisterItem = React.useCallback(function deregisterItem(id) {
    subitemKeys.current.delete(id);
    setSubitems(previousState => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);
  const registerItem = React.useCallback(function registerItem(id, item) {
    let providedOrGeneratedId;
    if (typeof id === 'function') {
      providedOrGeneratedId = id(subitemKeys.current);
    } else {
      providedOrGeneratedId = id;
    }
    subitemKeys.current.add(providedOrGeneratedId);
    setSubitems(previousState => {
      const newState = new Map(previousState);
      newState.set(providedOrGeneratedId, item);
      return newState;
    });
    return {
      id: providedOrGeneratedId,
      deregister: () => deregisterItem(providedOrGeneratedId)
    };
  }, [deregisterItem]);
  const sortedSubitems = React.useMemo(() => sortSubitems(subitems), [subitems]);
  const getItemIndex = React.useCallback(function getItemIndex(id) {
    return Array.from(sortedSubitems.keys()).indexOf(id);
  }, [sortedSubitems]);
  const contextValue = React.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount: subitems.size
  }), [getItemIndex, registerItem, subitems.size]);
  return {
    contextValue,
    subitems: sortedSubitems
  };
}