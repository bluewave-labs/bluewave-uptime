"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnMenu = exports.columnMenuStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _columnMenuSelector = require("./columnMenuSelector");
var _gridColumnsSelector = require("../columns/gridColumnsSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const columnMenuStateInitializer = state => (0, _extends2.default)({}, state, {
  columnMenu: {
    open: false
  }
});

/**
 * @requires useGridColumnResize (event)
 * @requires useGridInfiniteLoader (event)
 */
exports.columnMenuStateInitializer = columnMenuStateInitializer;
const useGridColumnMenu = apiRef => {
  const logger = (0, _utils.useGridLogger)(apiRef, 'useGridColumnMenu');

  /**
   * API METHODS
   */
  const showColumnMenu = React.useCallback(field => {
    const columnMenuState = (0, _columnMenuSelector.gridColumnMenuSelector)(apiRef.current.state);
    const newState = {
      open: true,
      field
    };
    const shouldUpdate = newState.open !== columnMenuState.open || newState.field !== columnMenuState.field;
    if (shouldUpdate) {
      apiRef.current.setState(state => {
        if (state.columnMenu.open && state.columnMenu.field === field) {
          return state;
        }
        logger.debug('Opening Column Menu');
        return (0, _extends2.default)({}, state, {
          columnMenu: {
            open: true,
            field
          }
        });
      });
      apiRef.current.hidePreferences();
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  const hideColumnMenu = React.useCallback(() => {
    const columnMenuState = (0, _columnMenuSelector.gridColumnMenuSelector)(apiRef.current.state);
    if (columnMenuState.field) {
      const columnLookup = (0, _gridColumnsSelector.gridColumnLookupSelector)(apiRef);
      const columnVisibilityModel = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
      const orderedFields = (0, _gridColumnsSelector.gridColumnFieldsSelector)(apiRef);
      let fieldToFocus = columnMenuState.field;

      // If the column was removed from the grid, we need to find the closest visible field
      if (!columnLookup[fieldToFocus]) {
        fieldToFocus = orderedFields[0];
      }

      // If the field to focus is hidden, we need to find the closest visible field
      if (columnVisibilityModel[fieldToFocus] === false) {
        // contains visible column fields + the field that was just hidden
        const visibleOrderedFields = orderedFields.filter(field => {
          if (field === fieldToFocus) {
            return true;
          }
          return columnVisibilityModel[field] !== false;
        });
        const fieldIndex = visibleOrderedFields.indexOf(fieldToFocus);
        fieldToFocus = visibleOrderedFields[fieldIndex + 1] || visibleOrderedFields[fieldIndex - 1];
      }
      apiRef.current.setColumnHeaderFocus(fieldToFocus);
    }
    const newState = {
      open: false,
      field: undefined
    };
    const shouldUpdate = newState.open !== columnMenuState.open || newState.field !== columnMenuState.field;
    if (shouldUpdate) {
      apiRef.current.setState(state => {
        logger.debug('Hiding Column Menu');
        return (0, _extends2.default)({}, state, {
          columnMenu: newState
        });
      });
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  const toggleColumnMenu = React.useCallback(field => {
    logger.debug('Toggle Column Menu');
    const columnMenu = (0, _columnMenuSelector.gridColumnMenuSelector)(apiRef.current.state);
    if (!columnMenu.open || columnMenu.field !== field) {
      showColumnMenu(field);
    } else {
      hideColumnMenu();
    }
  }, [apiRef, logger, showColumnMenu, hideColumnMenu]);
  const columnMenuApi = {
    showColumnMenu,
    hideColumnMenu,
    toggleColumnMenu
  };
  (0, _utils.useGridApiMethod)(apiRef, columnMenuApi, 'public');
  (0, _utils.useGridApiEventHandler)(apiRef, 'columnResizeStart', hideColumnMenu);
  (0, _utils.useGridApiEventHandler)(apiRef, 'virtualScrollerWheel', apiRef.current.hideColumnMenu);
  (0, _utils.useGridApiEventHandler)(apiRef, 'virtualScrollerTouchMove', apiRef.current.hideColumnMenu);
};
exports.useGridColumnMenu = useGridColumnMenu;