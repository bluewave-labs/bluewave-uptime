import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
const GridToolbarColumnsButton = /*#__PURE__*/React.forwardRef(function GridToolbarColumnsButton(props, ref) {
  const {
    slotProps = {}
  } = props;
  const buttonProps = slotProps.button || {};
  const tooltipProps = slotProps.tooltip || {};
  const columnButtonId = useId();
  const columnPanelId = useId();
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const preferencePanel = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  const showColumns = event => {
    if (preferencePanel.open && preferencePanel.openedPanelValue === GridPreferencePanelsValue.columns) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns, columnPanelId, columnButtonId);
    }
    buttonProps.onClick?.(event);
  };

  // Disable the button if the corresponding is disabled
  if (rootProps.disableColumnSelector) {
    return null;
  }
  const isOpen = preferencePanel.open && preferencePanel.panelId === columnPanelId;
  return /*#__PURE__*/_jsx(rootProps.slots.baseTooltip, _extends({
    title: apiRef.current.getLocaleText('toolbarColumnsLabel'),
    enterDelay: 1000
  }, tooltipProps, rootProps.slotProps?.baseTooltip, {
    children: /*#__PURE__*/_jsx(rootProps.slots.baseButton, _extends({
      ref: ref,
      id: columnButtonId,
      size: "small",
      "aria-label": apiRef.current.getLocaleText('toolbarColumnsLabel'),
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? columnPanelId : undefined,
      startIcon: /*#__PURE__*/_jsx(rootProps.slots.columnSelectorIcon, {})
    }, buttonProps, {
      onClick: showColumns
    }, rootProps.slotProps?.baseButton, {
      children: apiRef.current.getLocaleText('toolbarColumns')
    }))
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbarColumnsButton.propTypes = {
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
export { GridToolbarColumnsButton };