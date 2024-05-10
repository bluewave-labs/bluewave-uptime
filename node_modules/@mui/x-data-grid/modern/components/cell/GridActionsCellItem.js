import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["label", "icon", "showInMenu", "onClick"],
  _excluded2 = ["label", "icon", "showInMenu", "onClick", "closeMenuOnClick", "closeMenu"];
import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GridActionsCellItem = /*#__PURE__*/React.forwardRef((props, ref) => {
  const rootProps = useGridRootProps();
  if (!props.showInMenu) {
    const {
        label,
        icon,
        onClick
      } = props,
      other = _objectWithoutPropertiesLoose(props, _excluded);
    const handleClick = event => {
      onClick?.(event);
    };
    return /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
      ref: ref,
      size: "small",
      role: "menuitem",
      "aria-label": label
    }, other, {
      onClick: handleClick
    }, rootProps.slotProps?.baseIconButton, {
      children: /*#__PURE__*/React.cloneElement(icon, {
        fontSize: 'small'
      })
    }));
  }
  const {
      label,
      icon,
      onClick,
      closeMenuOnClick = true,
      closeMenu
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded2);
  const handleClick = event => {
    onClick?.(event);
    if (closeMenuOnClick) {
      closeMenu?.();
    }
  };
  return /*#__PURE__*/_jsxs(MenuItem, _extends({
    ref: ref
  }, other, {
    onClick: handleClick,
    children: [icon && /*#__PURE__*/_jsx(ListItemIcon, {
      children: icon
    }), label]
  }));
});
process.env.NODE_ENV !== "production" ? GridActionsCellItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * from https://mui.com/material-ui/api/button-base/#ButtonBase-prop-component
   */
  component: PropTypes.elementType,
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  showInMenu: PropTypes.bool
} : void 0;
export { GridActionsCellItem };