import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useGridSelector } from '../../../../hooks/utils/useGridSelector';
import { gridSortModelSelector } from '../../../../hooks/features/sorting/gridSortingSelector';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuSortItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const rootProps = useGridRootProps();
  const sortDirection = React.useMemo(() => {
    if (!colDef) {
      return null;
    }
    const sortItem = sortModel.find(item => item.field === colDef.field);
    return sortItem?.sort;
  }, [colDef, sortModel]);
  const sortingOrder = colDef.sortingOrder ?? rootProps.sortingOrder;
  const onSortMenuItemClick = React.useCallback(event => {
    onClick(event);
    const direction = event.currentTarget.getAttribute('data-value') || null;
    apiRef.current.sortColumn(colDef.field, direction === sortDirection ? null : direction);
  }, [apiRef, colDef, onClick, sortDirection]);
  if (rootProps.disableColumnSorting || !colDef || !colDef.sortable || !sortingOrder.some(item => !!item)) {
    return null;
  }
  const getLabel = key => {
    const label = apiRef.current.getLocaleText(key);
    return typeof label === 'function' ? label(colDef) : label;
  };
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [sortingOrder.includes('asc') && sortDirection !== 'asc' ? /*#__PURE__*/_jsxs(MenuItem, {
      onClick: onSortMenuItemClick,
      "data-value": "asc",
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuSortAscendingIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: getLabel('columnMenuSortAsc')
      })]
    }) : null, sortingOrder.includes('desc') && sortDirection !== 'desc' ? /*#__PURE__*/_jsxs(MenuItem, {
      onClick: onSortMenuItemClick,
      "data-value": "desc",
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuSortDescendingIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: getLabel('columnMenuSortDesc')
      })]
    }) : null, sortingOrder.includes(null) && sortDirection != null ? /*#__PURE__*/_jsxs(MenuItem, {
      onClick: onSortMenuItemClick,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {}), /*#__PURE__*/_jsx(ListItemText, {
        children: apiRef.current.getLocaleText('columnMenuUnsort')
      })]
    }) : null]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuSortItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuSortItem };