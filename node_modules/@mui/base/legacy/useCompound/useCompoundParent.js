'use client';

import * as React from 'react';
export var CompoundComponentContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  CompoundComponentContext.displayName = 'CompoundComponentContext';
}
/**
 * Sorts the subitems by their position in the DOM.
 */
function sortSubitems(subitems) {
  var subitemsArray = Array.from(subitems.keys()).map(function (key) {
    var subitem = subitems.get(key);
    return {
      key: key,
      subitem: subitem
    };
  });
  subitemsArray.sort(function (a, b) {
    var aNode = a.subitem.ref.current;
    var bNode = b.subitem.ref.current;
    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }

    // eslint-disable-next-line no-bitwise
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });
  return new Map(subitemsArray.map(function (item) {
    return [item.key, item.subitem];
  }));
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
  var _React$useState = React.useState(new Map()),
    subitems = _React$useState[0],
    setSubitems = _React$useState[1];
  var subitemKeys = React.useRef(new Set());
  var deregisterItem = React.useCallback(function deregisterItem(id) {
    subitemKeys.current.delete(id);
    setSubitems(function (previousState) {
      var newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);
  var registerItem = React.useCallback(function registerItem(id, item) {
    var providedOrGeneratedId;
    if (typeof id === 'function') {
      providedOrGeneratedId = id(subitemKeys.current);
    } else {
      providedOrGeneratedId = id;
    }
    subitemKeys.current.add(providedOrGeneratedId);
    setSubitems(function (previousState) {
      var newState = new Map(previousState);
      newState.set(providedOrGeneratedId, item);
      return newState;
    });
    return {
      id: providedOrGeneratedId,
      deregister: function deregister() {
        return deregisterItem(providedOrGeneratedId);
      }
    };
  }, [deregisterItem]);
  var sortedSubitems = React.useMemo(function () {
    return sortSubitems(subitems);
  }, [subitems]);
  var getItemIndex = React.useCallback(function getItemIndex(id) {
    return Array.from(sortedSubitems.keys()).indexOf(id);
  }, [sortedSubitems]);
  var contextValue = React.useMemo(function () {
    return {
      getItemIndex: getItemIndex,
      registerItem: registerItem,
      totalSubitemCount: subitems.size
    };
  }, [getItemIndex, registerItem, subitems.size]);
  return {
    contextValue: contextValue,
    subitems: sortedSubitems
  };
}