import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridOverlay } from './containers/GridOverlay';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridNoResultsOverlay = /*#__PURE__*/React.forwardRef(function GridNoResultsOverlay(props, ref) {
  const apiRef = useGridApiContext();
  const noResultsOverlayLabel = apiRef.current.getLocaleText('noResultsOverlayLabel');
  return /*#__PURE__*/_jsx(GridOverlay, _extends({
    ref: ref
  }, props, {
    children: noResultsOverlayLabel
  }));
});