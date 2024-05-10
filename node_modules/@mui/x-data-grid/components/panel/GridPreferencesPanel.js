import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridColumnDefinitionsSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridPreferencesPanel = /*#__PURE__*/React.forwardRef(function GridPreferencesPanel(props, ref) {
  const apiRef = useGridApiContext();
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const rootProps = useGridRootProps();
  const preferencePanelState = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  const panelContent = apiRef.current.unstable_applyPipeProcessors('preferencePanel', null, preferencePanelState.openedPanelValue ?? GridPreferencePanelsValue.filters);
  return /*#__PURE__*/_jsx(rootProps.slots.panel, _extends({
    ref: ref,
    as: rootProps.slots.basePopper,
    open: columns.length > 0 && preferencePanelState.open,
    id: preferencePanelState.panelId,
    "aria-labelledby": preferencePanelState.labelId
  }, rootProps.slotProps?.panel, props, rootProps.slotProps?.basePopper, {
    children: panelContent
  }));
});