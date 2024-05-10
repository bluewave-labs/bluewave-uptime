import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridOverlay } from './containers/GridOverlay';
import { jsx as _jsx } from "react/jsx-runtime";
const GridNoRowsOverlay = /*#__PURE__*/React.forwardRef(function GridNoRowsOverlay(props, ref) {
  const apiRef = useGridApiContext();
  const noRowsLabel = apiRef.current.getLocaleText('noRowsLabel');
  return /*#__PURE__*/_jsx(GridOverlay, _extends({
    ref: ref
  }, props, {
    children: noRowsLabel
  }));
});
process.env.NODE_ENV !== "production" ? GridNoRowsOverlay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridNoRowsOverlay };