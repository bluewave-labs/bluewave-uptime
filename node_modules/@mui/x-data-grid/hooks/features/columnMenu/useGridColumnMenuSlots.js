import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["displayOrder"];
import * as React from 'react';
import Divider from '@mui/material/Divider';
import { useGridPrivateApiContext } from '../../utils/useGridPrivateApiContext';
const useGridColumnMenuSlots = props => {
  const apiRef = useGridPrivateApiContext();
  const {
    defaultSlots,
    defaultSlotProps,
    slots = {},
    slotProps = {},
    hideMenu,
    colDef,
    addDividers = true
  } = props;
  const processedComponents = React.useMemo(() => _extends({}, defaultSlots, slots), [defaultSlots, slots]);
  const processedSlotProps = React.useMemo(() => {
    if (!slotProps || Object.keys(slotProps).length === 0) {
      return defaultSlotProps;
    }
    const mergedProps = _extends({}, slotProps);
    Object.entries(defaultSlotProps).forEach(([key, currentSlotProps]) => {
      mergedProps[key] = _extends({}, currentSlotProps, slotProps[key] || {});
    });
    return mergedProps;
  }, [defaultSlotProps, slotProps]);
  const defaultItems = apiRef.current.unstable_applyPipeProcessors('columnMenu', [], props.colDef);
  const userItems = React.useMemo(() => {
    const defaultComponentKeys = Object.keys(defaultSlots);
    return Object.keys(slots).filter(key => !defaultComponentKeys.includes(key));
  }, [slots, defaultSlots]);
  return React.useMemo(() => {
    const uniqueItems = Array.from(new Set([...defaultItems, ...userItems]));
    const cleansedItems = uniqueItems.filter(key => processedComponents[key] != null);
    const sorted = cleansedItems.sort((a, b) => {
      const leftItemProps = processedSlotProps[a];
      const rightItemProps = processedSlotProps[b];
      const leftDisplayOrder = Number.isFinite(leftItemProps?.displayOrder) ? leftItemProps.displayOrder : 100;
      const rightDisplayOrder = Number.isFinite(rightItemProps?.displayOrder) ? rightItemProps.displayOrder : 100;
      return leftDisplayOrder - rightDisplayOrder;
    });
    return sorted.reduce((acc, key, index) => {
      let itemProps = {
        colDef,
        onClick: hideMenu
      };
      const processedComponentProps = processedSlotProps[key];
      if (processedComponentProps) {
        const customProps = _objectWithoutPropertiesLoose(processedComponentProps, _excluded);
        itemProps = _extends({}, itemProps, customProps);
      }
      return addDividers && index !== sorted.length - 1 ? [...acc, [processedComponents[key], itemProps], [Divider, {}]] : [...acc, [processedComponents[key], itemProps]];
    }, []);
  }, [addDividers, colDef, defaultItems, hideMenu, processedComponents, processedSlotProps, userItems]);
};
export { useGridColumnMenuSlots };