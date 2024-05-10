"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOptionContextStabilizer = useOptionContextStabilizer;
var React = _interopRequireWildcard(require("react"));
var _useList = require("../useList");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Stabilizes the ListContext value for the Option component, so it doesn't change when sibling Options update.
 *
 * @param value The value of the Option.
 * @returns The stable ListContext value.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOptionContextStabilizer API](https://mui.com/base-ui/react-select/hooks-api/#use-option-context-stabilizer)
 */
function useOptionContextStabilizer(value) {
  const listContext = React.useContext(_useList.ListContext);
  if (!listContext) {
    throw new Error('Option: ListContext was not found.');
  }
  const {
    getItemState,
    dispatch
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(value);

  // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  const localGetItemState = React.useCallback(itemValue => {
    if (itemValue !== value) {
      throw new Error(['Base UI Option: Tried to access the state of another Option.', 'This is unsupported when the Option uses the OptionContextStabilizer as a performance optimization.'].join('/n'));
    }
    return {
      highlighted,
      selected,
      focusable
    };
  }, [highlighted, selected, focusable, value]);

  // Create a local (per Option) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes Options re-render only when their state actually change, not when any Option's state changes.
  const localContextValue = React.useMemo(() => ({
    dispatch,
    getItemState: localGetItemState
  }), [dispatch, localGetItemState]);
  return {
    contextValue: localContextValue
  };
}