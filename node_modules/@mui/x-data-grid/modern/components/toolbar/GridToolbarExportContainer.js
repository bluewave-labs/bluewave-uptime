import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import MenuList from '@mui/material/MenuList';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GridToolbarExportContainer = /*#__PURE__*/React.forwardRef(function GridToolbarExportContainer(props, ref) {
  const {
    children,
    slotProps = {}
  } = props;
  const buttonProps = slotProps.button || {};
  const tooltipProps = slotProps.tooltip || {};
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const exportButtonId = useId();
  const exportMenuId = useId();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(ref, buttonRef);
  const handleMenuOpen = event => {
    setOpen(prevOpen => !prevOpen);
    buttonProps.onClick?.(event);
  };
  const handleMenuClose = () => setOpen(false);
  const handleListKeyDown = event => {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }
    if (isHideMenuKey(event.key)) {
      handleMenuClose();
    }
  };
  if (children == null) {
    return null;
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(rootProps.slots.baseTooltip, _extends({
      title: apiRef.current.getLocaleText('toolbarExportLabel'),
      enterDelay: 1000
    }, tooltipProps, rootProps.slotProps?.baseTooltip, {
      children: /*#__PURE__*/_jsx(rootProps.slots.baseButton, _extends({
        ref: handleRef,
        size: "small",
        startIcon: /*#__PURE__*/_jsx(rootProps.slots.exportIcon, {}),
        "aria-expanded": open,
        "aria-label": apiRef.current.getLocaleText('toolbarExportLabel'),
        "aria-haspopup": "menu",
        "aria-controls": open ? exportMenuId : undefined,
        id: exportButtonId
      }, buttonProps, {
        onClick: handleMenuOpen
      }, rootProps.slotProps?.baseButton, {
        children: apiRef.current.getLocaleText('toolbarExport')
      }))
    })), /*#__PURE__*/_jsx(GridMenu, {
      open: open,
      target: buttonRef.current,
      onClose: handleMenuClose,
      position: "bottom-start",
      children: /*#__PURE__*/_jsx(MenuList, {
        id: exportMenuId,
        className: gridClasses.menuList,
        "aria-labelledby": exportButtonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: React.Children.map(children, child => {
          if (! /*#__PURE__*/React.isValidElement(child)) {
            return child;
          }
          return /*#__PURE__*/React.cloneElement(child, {
            hideMenu: handleMenuClose
          });
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? GridToolbarExportContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.object
} : void 0;
export { GridToolbarExportContainer };