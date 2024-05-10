import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useGridApiContext } from '../../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuFilterItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const showFilter = React.useCallback(event => {
    onClick(event);
    apiRef.current.showFilterPanel(colDef.field);
  }, [apiRef, colDef.field, onClick]);
  if (rootProps.disableColumnFilter || !colDef.filterable) {
    return null;
  }
  return /*#__PURE__*/_jsxs(MenuItem, {
    onClick: showFilter,
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuFilterIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/_jsx(ListItemText, {
      children: apiRef.current.getLocaleText('columnMenuFilter')
    })]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuFilterItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuFilterItem };