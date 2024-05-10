"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuReducer = menuReducer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useList = require("../useList");
function menuReducer(state, action) {
  if (action.type === _useList.ListActionTypes.itemHover) {
    return (0, _extends2.default)({}, state, {
      highlightedValue: action.item
    });
  }
  const newState = (0, _useList.listReducer)(state, action);

  // make sure an item is always highlighted
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return (0, _extends2.default)({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === _useList.ListActionTypes.keyDown) {
    if (action.event.key === 'Escape') {
      return (0, _extends2.default)({}, newState, {
        open: false
      });
    }
  }
  if (action.type === _useList.ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      var _action$context$listb2, _action$event$related;
      // To prevent the menu from closing when the focus leaves the menu to the button.
      // For more details, see https://github.com/mui/material-ui/pull/36917#issuecomment-1566992698
      const listboxId = (_action$context$listb2 = action.context.listboxRef.current) == null ? void 0 : _action$context$listb2.getAttribute('id');
      const controlledBy = (_action$event$related = action.event.relatedTarget) == null ? void 0 : _action$event$related.getAttribute('aria-controls');
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }
      return (0, _extends2.default)({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}