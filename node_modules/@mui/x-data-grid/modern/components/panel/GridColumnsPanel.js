import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GridPanelWrapper } from './GridPanelWrapper';
import { GridColumnsManagement } from '../columnsManagement';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function GridColumnsPanel(props) {
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsx(GridPanelWrapper, _extends({}, props, {
    children: /*#__PURE__*/_jsx(GridColumnsManagement, _extends({}, rootProps.slotProps?.columnsManagement))
  }));
}
process.env.NODE_ENV !== "production" ? GridColumnsPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  slotProps: PropTypes.object
} : void 0;
export { GridColumnsPanel };