import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { gridDensitySelector } from '../../hooks/features/density/densitySelector';
import { isHideMenuKey, isTabKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GridToolbarDensitySelector = /*#__PURE__*/React.forwardRef(function GridToolbarDensitySelector(props, ref) {
  const {
    slotProps = {}
  } = props;
  const buttonProps = slotProps.button || {};
  const tooltipProps = slotProps.tooltip || {};
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const densityButtonId = useId();
  const densityMenuId = useId();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(ref, buttonRef);
  const densityOptions = [{
    icon: /*#__PURE__*/_jsx(rootProps.slots.densityCompactIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityCompact'),
    value: 'compact'
  }, {
    icon: /*#__PURE__*/_jsx(rootProps.slots.densityStandardIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityStandard'),
    value: 'standard'
  }, {
    icon: /*#__PURE__*/_jsx(rootProps.slots.densityComfortableIcon, {}),
    label: apiRef.current.getLocaleText('toolbarDensityComfortable'),
    value: 'comfortable'
  }];
  const startIcon = React.useMemo(() => {
    switch (density) {
      case 'compact':
        return /*#__PURE__*/_jsx(rootProps.slots.densityCompactIcon, {});
      case 'comfortable':
        return /*#__PURE__*/_jsx(rootProps.slots.densityComfortableIcon, {});
      default:
        return /*#__PURE__*/_jsx(rootProps.slots.densityStandardIcon, {});
    }
  }, [density, rootProps]);
  const handleDensitySelectorOpen = event => {
    setOpen(prevOpen => !prevOpen);
    buttonProps.onClick?.(event);
  };
  const handleDensitySelectorClose = () => {
    setOpen(false);
  };
  const handleDensityUpdate = newDensity => {
    apiRef.current.setDensity(newDensity);
    setOpen(false);
  };
  const handleListKeyDown = event => {
    if (isTabKey(event.key)) {
      event.preventDefault();
    }
    if (isHideMenuKey(event.key)) {
      setOpen(false);
    }
  };

  // Disable the button if the corresponding is disabled
  if (rootProps.disableDensitySelector) {
    return null;
  }
  const densityElements = densityOptions.map((option, index) => /*#__PURE__*/_jsxs(MenuItem, {
    onClick: () => handleDensityUpdate(option.value),
    selected: option.value === density,
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: option.icon
    }), option.label]
  }, index));
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(rootProps.slots.baseTooltip, _extends({
      title: apiRef.current.getLocaleText('toolbarDensityLabel'),
      enterDelay: 1000
    }, tooltipProps, rootProps.slotProps?.baseTooltip, {
      children: /*#__PURE__*/_jsx(rootProps.slots.baseButton, _extends({
        ref: handleRef,
        size: "small",
        startIcon: startIcon,
        "aria-label": apiRef.current.getLocaleText('toolbarDensityLabel'),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? densityMenuId : undefined,
        id: densityButtonId
      }, buttonProps, {
        onClick: handleDensitySelectorOpen
      }, rootProps.slotProps?.baseButton, {
        children: apiRef.current.getLocaleText('toolbarDensity')
      }))
    })), /*#__PURE__*/_jsx(GridMenu, {
      open: open,
      target: buttonRef.current,
      onClose: handleDensitySelectorClose,
      position: "bottom-start",
      children: /*#__PURE__*/_jsx(MenuList, {
        id: densityMenuId,
        className: gridClasses.menuList,
        "aria-labelledby": densityButtonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: densityElements
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? GridToolbarDensitySelector.propTypes = {
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
export { GridToolbarDensitySelector };