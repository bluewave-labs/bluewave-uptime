import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridPreferencesPanel } from './panel/GridPreferencesPanel';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function GridHeader() {
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(GridPreferencesPanel, {}), rootProps.slots.toolbar && /*#__PURE__*/_jsx(rootProps.slots.toolbar, _extends({}, rootProps.slotProps?.toolbar))]
  });
}