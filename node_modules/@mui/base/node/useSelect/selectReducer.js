"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectReducer = selectReducer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useList = require("../useList");
var _useSelect = require("./useSelect.types");
function selectReducer(state, action) {
  const {
    open
  } = state;
  const {
    context: {
      selectionMode
    }
  } = action;
  if (action.type === _useSelect.SelectActionTypes.buttonClick) {
    var _state$selectedValues;
    const itemToHighlight = (_state$selectedValues = state.selectedValues[0]) != null ? _state$selectedValues : (0, _useList.moveHighlight)(null, 'start', action.context);
    return (0, _extends2.default)({}, state, {
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    });
  }
  if (action.type === _useSelect.SelectActionTypes.browserAutoFill) {
    return (0, _useList.handleItemSelection)(action.item, state, action.context);
  }
  const newState = (0, _useList.listReducer)(state, action);
  switch (action.type) {
    case _useList.ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === 'Escape') {
          return (0, _extends2.default)({}, newState, {
            open: false
          });
        }
      } else {
        if (action.event.key === 'ArrowDown') {
          var _state$selectedValues2;
          return (0, _extends2.default)({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues2 = state.selectedValues[0]) != null ? _state$selectedValues2 : (0, _useList.moveHighlight)(null, 'start', action.context)
          });
        }
        if (action.event.key === 'ArrowUp') {
          var _state$selectedValues3;
          return (0, _extends2.default)({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues3 = state.selectedValues[0]) != null ? _state$selectedValues3 : (0, _useList.moveHighlight)(null, 'end', action.context)
          });
        }
      }
      break;
    case _useList.ListActionTypes.itemClick:
      if (selectionMode === 'single') {
        return (0, _extends2.default)({}, newState, {
          open: false
        });
      }
      break;
    case _useList.ListActionTypes.blur:
      return (0, _extends2.default)({}, newState, {
        open: false
      });
    default:
      return newState;
  }
  return newState;
}