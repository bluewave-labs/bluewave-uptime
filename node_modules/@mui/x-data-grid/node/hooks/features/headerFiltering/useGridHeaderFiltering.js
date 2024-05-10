"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridHeaderFiltering = exports.headerFilteringStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _utils = require("../../utils");
var _gridColumnsSelector = require("../columns/gridColumnsSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const headerFilteringStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  headerFiltering: {
    enabled: props.headerFilters ?? false,
    editing: null,
    menuOpen: null
  }
});
exports.headerFilteringStateInitializer = headerFilteringStateInitializer;
const useGridHeaderFiltering = (apiRef, props) => {
  const logger = (0, _utils.useGridLogger)(apiRef, 'useGridHeaderFiltering');
  const setHeaderFilterState = React.useCallback(headerFilterState => {
    apiRef.current.setState(state => {
      // Safety check to avoid MIT users from using it
      // This hook should ultimately be moved to the Pro package
      if (props.signature === 'DataGrid') {
        return state;
      }
      return (0, _extends2.default)({}, state, {
        headerFiltering: {
          enabled: props.headerFilters ?? false,
          editing: headerFilterState.editing ?? null,
          menuOpen: headerFilterState.menuOpen ?? null
        }
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.signature, props.headerFilters]);
  const startHeaderFilterEditMode = React.useCallback(field => {
    logger.debug(`Starting edit mode on header filter for field: ${field}`);
    apiRef.current.setHeaderFilterState({
      editing: field
    });
  }, [apiRef, logger]);
  const stopHeaderFilterEditMode = React.useCallback(() => {
    logger.debug(`Stopping edit mode on header filter`);
    apiRef.current.setHeaderFilterState({
      editing: null
    });
  }, [apiRef, logger]);
  const showHeaderFilterMenu = React.useCallback(field => {
    logger.debug(`Opening header filter menu for field: ${field}`);
    apiRef.current.setHeaderFilterState({
      menuOpen: field
    });
  }, [apiRef, logger]);
  const hideHeaderFilterMenu = React.useCallback(() => {
    logger.debug(`Hiding header filter menu for active field`);
    let fieldToFocus = apiRef.current.state.headerFiltering.menuOpen;
    if (fieldToFocus) {
      const columnLookup = (0, _gridColumnsSelector.gridColumnLookupSelector)(apiRef);
      const columnVisibilityModel = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);
      const orderedFields = (0, _gridColumnsSelector.gridColumnFieldsSelector)(apiRef);

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
      apiRef.current.setHeaderFilterState({
        menuOpen: null
      });
      apiRef.current.setColumnHeaderFilterFocus(fieldToFocus);
    }
  }, [apiRef, logger]);
  const headerFilterPrivateApi = {
    setHeaderFilterState
  };
  const headerFilterApi = {
    startHeaderFilterEditMode,
    stopHeaderFilterEditMode,
    showHeaderFilterMenu,
    hideHeaderFilterMenu
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, headerFilterApi, 'public');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, headerFilterPrivateApi, 'private');

  /*
   * EFFECTS
   */
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      apiRef.current.setHeaderFilterState({
        enabled: props.headerFilters ?? false
      });
    }
  }, [apiRef, props.headerFilters]);
};
exports.useGridHeaderFiltering = useGridHeaderFiltering;