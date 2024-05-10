import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import Badge from '@mui/material/Badge';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridIconButtonContainer } from './GridIconButtonContainer';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    icon: ['sortIcon']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function getIcon(icons, direction, className, sortingOrder) {
  let Icon;
  const iconProps = {};
  if (direction === 'asc') {
    Icon = icons.columnSortedAscendingIcon;
  } else if (direction === 'desc') {
    Icon = icons.columnSortedDescendingIcon;
  } else {
    Icon = icons.columnUnsortedIcon;
    iconProps.sortingOrder = sortingOrder;
  }
  return Icon ? /*#__PURE__*/_jsx(Icon, _extends({
    fontSize: "small",
    className: className
  }, iconProps)) : null;
}
function GridColumnHeaderSortIconRaw(props) {
  const {
    direction,
    index,
    sortingOrder,
    disabled
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = _extends({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const iconElement = getIcon(rootProps.slots, direction, classes.icon, sortingOrder);
  if (!iconElement) {
    return null;
  }
  const iconButton = /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
    tabIndex: -1,
    "aria-label": apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    title: apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    size: "small",
    disabled: disabled
  }, rootProps.slotProps?.baseIconButton, {
    children: iconElement
  }));
  return /*#__PURE__*/_jsxs(GridIconButtonContainer, {
    children: [index != null && /*#__PURE__*/_jsx(Badge, {
      badgeContent: index,
      color: "default",
      children: iconButton
    }), index == null && iconButton]
  });
}
const GridColumnHeaderSortIcon = /*#__PURE__*/React.memo(GridColumnHeaderSortIconRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSortIconRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  direction: PropTypes.oneOf(['asc', 'desc']),
  disabled: PropTypes.bool,
  index: PropTypes.number,
  sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc'])).isRequired
} : void 0;
export { GridColumnHeaderSortIcon };