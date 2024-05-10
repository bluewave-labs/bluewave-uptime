import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["hideMenu", "colDef", "id", "labelledby", "className", "children", "open"];
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import { styled } from '@mui/material/styles';
import { isHideMenuKey, isTabKey } from '../../../utils/keyboardUtils';
import { gridClasses } from '../../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const StyledMenuList = styled(MenuList)(() => ({
  minWidth: 248
}));
const GridColumnMenuContainer = /*#__PURE__*/React.forwardRef(function GridColumnMenuContainer(props, ref) {
  const {
      hideMenu,
      id,
      labelledby,
      className,
      children,
      open
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const handleListKeyDown = React.useCallback(event => {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }
    if (isHideMenuKey(event.key)) {
      hideMenu(event);
    }
  }, [hideMenu]);
  return /*#__PURE__*/_jsx(StyledMenuList, _extends({
    id: id,
    ref: ref,
    className: clsx(gridClasses.menuList, className),
    "aria-labelledby": labelledby,
    onKeyDown: handleListKeyDown,
    autoFocus: open
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnMenuContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  id: PropTypes.string,
  labelledby: PropTypes.string,
  open: PropTypes.bool.isRequired
} : void 0;
export { GridColumnMenuContainer };