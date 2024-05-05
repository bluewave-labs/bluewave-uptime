import _extends from "@babel/runtime/helpers/esm/extends";
import { moveHighlight, listReducer, ListActionTypes, handleItemSelection } from '../useList';
import { SelectActionTypes } from './useSelect.types';
export function selectReducer(state, action) {
  var open = state.open;
  var selectionMode = action.context.selectionMode;
  if (action.type === SelectActionTypes.buttonClick) {
    var _state$selectedValues;
    var itemToHighlight = (_state$selectedValues = state.selectedValues[0]) != null ? _state$selectedValues : moveHighlight(null, 'start', action.context);
    return _extends({}, state, {
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    });
  }
  if (action.type === SelectActionTypes.browserAutoFill) {
    return handleItemSelection(action.item, state, action.context);
  }
  var newState = listReducer(state, action);
  switch (action.type) {
    case ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === 'Escape') {
          return _extends({}, newState, {
            open: false
          });
        }
      } else {
        if (action.event.key === 'ArrowDown') {
          var _state$selectedValues2;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues2 = state.selectedValues[0]) != null ? _state$selectedValues2 : moveHighlight(null, 'start', action.context)
          });
        }
        if (action.event.key === 'ArrowUp') {
          var _state$selectedValues3;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues3 = state.selectedValues[0]) != null ? _state$selectedValues3 : moveHighlight(null, 'end', action.context)
          });
        }
      }
      break;
    case ListActionTypes.itemClick:
      if (selectionMode === 'single') {
        return _extends({}, newState, {
          open: false
        });
      }
      break;
    case ListActionTypes.blur:
      return _extends({}, newState, {
        open: false
      });
    default:
      return newState;
  }
  return newState;
}