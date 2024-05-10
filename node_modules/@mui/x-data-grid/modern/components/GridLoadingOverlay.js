import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { GridOverlay } from './containers/GridOverlay';
import { jsx as _jsx } from "react/jsx-runtime";
const GridLoadingOverlay = /*#__PURE__*/React.forwardRef(function GridLoadingOverlay(props, ref) {
  return /*#__PURE__*/_jsx(GridOverlay, _extends({
    ref: ref
  }, props, {
    children: /*#__PURE__*/_jsx(CircularProgress, {})
  }));
});
process.env.NODE_ENV !== "production" ? GridLoadingOverlay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridLoadingOverlay };