import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef, unstable_useEnhancedEffect as useEnhancedEffect, unstable_capitalize as capitalize, unstable_composeClasses as composeClasses } from '@mui/utils';
import { styled } from '@mui/system';
import { GridRootStyles } from './GridRootStyles';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { gridDensitySelector } from '../../hooks/features/density/densitySelector';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    autoHeight,
    density,
    classes,
    showCellVerticalBorder
  } = ownerState;
  const slots = {
    root: ['root', autoHeight && 'autoHeight', `root--density${capitalize(density)}`, 'withBorderColor', showCellVerticalBorder && 'withVerticalBorder']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
const GridPanelAnchor = styled('div')({
  position: 'absolute',
  top: `var(--DataGrid-headersTotalHeight)`,
  left: 0
});
const GridRoot = /*#__PURE__*/React.forwardRef(function GridRoot(props, ref) {
  const rootProps = useGridRootProps();
  const {
      children,
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const density = useGridSelector(apiRef, gridDensitySelector);
  const rootElementRef = apiRef.current.rootElementRef;
  const handleRef = useForkRef(rootElementRef, ref);
  const ownerState = _extends({}, rootProps, {
    density
  });
  const classes = useUtilityClasses(ownerState);

  // Our implementation of <NoSsr />
  const [mountedState, setMountedState] = React.useState(false);
  useEnhancedEffect(() => {
    setMountedState(true);
  }, []);
  if (!mountedState) {
    return null;
  }
  return /*#__PURE__*/_jsxs(GridRootStyles, _extends({
    ref: handleRef,
    className: clsx(className, classes.root),
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/_jsx(GridPanelAnchor, {
      role: "presentation",
      "data-id": "gridPanelAnchor"
    }), children]
  }));
});
process.env.NODE_ENV !== "production" ? GridRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridRoot };