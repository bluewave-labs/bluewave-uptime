"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMenuItemContextStabilizer = useMenuItemContextStabilizer;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _useList = require("../useList");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Stabilizes the ListContext value for the MenuItem component, so it doesn't change when sibling items update.
 *
 * @param id The id of the MenuItem. If undefined, it will be generated with useId.
 * @returns The stable ListContext value and the id of the MenuItem.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItemContextStabilizer API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item-context-stabilizer)
 */
function useMenuItemContextStabilizer(id) {
  const listContext = React.useContext(_useList.ListContext);
  if (!listContext) {
    throw new Error('MenuItem: ListContext was not found.');
  }
  const itemId = (0, _utils.unstable_useId)(id);
  const {
    getItemState,
    dispatch
  } = listContext;
  let itemState;
  if (itemId != null) {
    itemState = getItemState(itemId);
  } else {
    itemState = {
      focusable: true,
      highlighted: false,
      selected: false
    };
  }
  const {
    highlighted,
    selected,
    focusable
  } = itemState;

  // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  const localGetItemState = React.useCallback(itemValue => {
    if (itemValue !== itemId) {
      throw new Error(['Base UI MenuItem: Tried to access the state of another MenuItem.', `itemValue: ${itemValue} | id: ${itemId}`, 'This is unsupported when the MenuItem uses the MenuItemContextStabilizer as a performance optimization.'].join('/n'));
    }
    return {
      highlighted,
      selected,
      focusable
    };
  }, [highlighted, selected, focusable, itemId]);

  // Create a local (per MenuItem) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes MenuItems re-render only when their state actually change, not when any MenuItem's state changes.
  const localContextValue = React.useMemo(() => ({
    dispatch,
    getItemState: localGetItemState
  }), [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue,
    id: itemId
  };
}