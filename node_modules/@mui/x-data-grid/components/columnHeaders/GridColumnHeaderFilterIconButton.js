import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, unstable_useId as useId } from '@mui/utils';
import Badge from '@mui/material/Badge';
import { useGridSelector } from '../../hooks';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
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
    icon: ['filterIcon']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridColumnHeaderFilterIconButton(props) {
  const {
    counter,
    field,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = _extends({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const preferencePanel = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  const labelId = useId();
  const panelId = useId();
  const toggleFilter = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    const {
      open,
      openedPanelValue
    } = gridPreferencePanelStateSelector(apiRef.current.state);
    if (open && openedPanelValue === GridPreferencePanelsValue.filters) {
      apiRef.current.hideFilterPanel();
    } else {
      apiRef.current.showFilterPanel(undefined, panelId, labelId);
    }
    if (onClick) {
      onClick(apiRef.current.getColumnHeaderParams(field), event);
    }
  }, [apiRef, field, onClick, panelId, labelId]);
  if (!counter) {
    return null;
  }
  const open = preferencePanel.open && preferencePanel.labelId === labelId;
  const iconButton = /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
    id: labelId,
    onClick: toggleFilter,
    color: "default",
    "aria-label": apiRef.current.getLocaleText('columnHeaderFiltersLabel'),
    size: "small",
    tabIndex: -1,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? panelId : undefined
  }, rootProps.slotProps?.baseIconButton, {
    children: /*#__PURE__*/_jsx(rootProps.slots.columnFilteredIcon, {
      className: classes.icon,
      fontSize: "small"
    })
  }));
  return /*#__PURE__*/_jsx(rootProps.slots.baseTooltip, _extends({
    title: apiRef.current.getLocaleText('columnHeaderFiltersTooltipActive')(counter),
    enterDelay: 1000
  }, rootProps.slotProps?.baseTooltip, {
    children: /*#__PURE__*/_jsxs(GridIconButtonContainer, {
      children: [counter > 1 && /*#__PURE__*/_jsx(Badge, {
        badgeContent: counter,
        color: "default",
        children: iconButton
      }), counter === 1 && iconButton]
    })
  }));
}
process.env.NODE_ENV !== "production" ? GridColumnHeaderFilterIconButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  counter: PropTypes.number,
  field: PropTypes.string.isRequired,
  onClick: PropTypes.func
} : void 0;
export { GridColumnHeaderFilterIconButton };