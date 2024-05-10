import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "slotProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FocusTrap from '@mui/material/Unstable_TrapFocus';
import { styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['panelWrapper']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const GridPanelWrapperRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PanelWrapper',
  overridesResolver: (props, styles) => styles.panelWrapper
})({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '&:focus': {
    outline: 0
  }
});
const isEnabled = () => true;
const GridPanelWrapper = /*#__PURE__*/React.forwardRef(function GridPanelWrapper(props, ref) {
  const {
      className,
      slotProps = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  const classes = useUtilityClasses(rootProps);
  return /*#__PURE__*/_jsx(FocusTrap, _extends({
    open: true,
    disableEnforceFocus: true,
    isEnabled: isEnabled
  }, slotProps.TrapFocus, {
    children: /*#__PURE__*/_jsx(GridPanelWrapperRoot, _extends({
      ref: ref,
      tabIndex: -1,
      className: clsx(className, classes.root),
      ownerState: rootProps
    }, other))
  }));
});
process.env.NODE_ENV !== "production" ? GridPanelWrapper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  slotProps: PropTypes.object
} : void 0;
export { GridPanelWrapper };