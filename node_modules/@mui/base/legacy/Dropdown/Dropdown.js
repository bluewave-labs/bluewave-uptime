'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import { DropdownContext } from '../useDropdown/DropdownContext';
import { useDropdown } from '../useDropdown/useDropdown';
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [Dropdown API](https://mui.com/base-ui/react-menu/components-api/#dropdown)
 */
import { jsx as _jsx } from "react/jsx-runtime";
function Dropdown(props) {
  var children = props.children,
    open = props.open,
    defaultOpen = props.defaultOpen,
    onOpenChange = props.onOpenChange;
  var _useDropdown = useDropdown({
      defaultOpen: defaultOpen,
      onOpenChange: onOpenChange,
      open: open
    }),
    contextValue = _useDropdown.contextValue;
  return /*#__PURE__*/_jsx(DropdownContext.Provider, {
    value: contextValue,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? Dropdown.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, the dropdown is initially open.
   */
  defaultOpen: PropTypes.bool,
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange: PropTypes.func,
  /**
   * Allows to control whether the dropdown is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open: PropTypes.bool
} : void 0;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Dropdown['propTypes' + ''] = exactProp(Dropdown.propTypes);
}
export { Dropdown };