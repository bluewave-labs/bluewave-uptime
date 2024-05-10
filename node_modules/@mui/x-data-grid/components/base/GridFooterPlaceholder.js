import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridFooterPlaceholder() {
  const rootProps = useGridRootProps();
  if (rootProps.hideFooter) {
    return null;
  }
  return /*#__PURE__*/_jsx(rootProps.slots.footer, _extends({}, rootProps.slotProps?.footer /* FIXME: typing error */));
}