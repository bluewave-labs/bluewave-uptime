"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridEvents = useGridEvents;
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
/**
 * @requires useGridFocus (event) - can be after, async only
 * @requires useGridColumns (event) - can be after, async only
 */
function useGridEvents(apiRef, props) {
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderClick', props.onColumnHeaderClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderDoubleClick', props.onColumnHeaderDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderOver', props.onColumnHeaderOver);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderOut', props.onColumnHeaderOut);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderEnter', props.onColumnHeaderEnter);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'columnHeaderLeave', props.onColumnHeaderLeave);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'cellClick', props.onCellClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'cellDoubleClick', props.onCellDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'cellKeyDown', props.onCellKeyDown);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'preferencePanelClose', props.onPreferencePanelClose);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'preferencePanelOpen', props.onPreferencePanelOpen);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'menuOpen', props.onMenuOpen);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'menuClose', props.onMenuClose);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'rowDoubleClick', props.onRowDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'rowClick', props.onRowClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, 'stateChange', props.onStateChange);
}