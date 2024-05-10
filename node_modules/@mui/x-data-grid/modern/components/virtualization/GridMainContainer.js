import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { styled } from '@mui/system';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridAriaAttributes } from '../../hooks/utils/useGridAriaAttributes';
import { jsx as _jsx } from "react/jsx-runtime";
const Element = styled('div', {
  name: 'MuiDataGrid',
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main
})({
  flexGrow: 1,
  position: 'relative',
  overflow: 'hidden'
});
export const GridMainContainer = /*#__PURE__*/React.forwardRef((props, ref) => {
  const ariaAttributes = useGridAriaAttributes();
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsx(Element, _extends({
    ref: ref,
    ownerState: rootProps,
    className: props.className,
    tabIndex: -1
  }, ariaAttributes, {
    children: props.children
  }));
});