import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["field", "align", "width", "height"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import { unstable_composeClasses as composeClasses, unstable_capitalize as capitalize } from '@mui/utils';
import { fastMemo } from '../../utils/fastMemo';
import { randomNumberBetween } from '../../utils/utils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const randomWidth = randomNumberBetween(10000, 20, 80);
const useUtilityClasses = ownerState => {
  const {
    align,
    classes
  } = ownerState;
  const slots = {
    root: ['cell', 'cellSkeleton', `cell--text${capitalize(align)}`, 'withBorderColor']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridSkeletonCell(props) {
  const {
      align,
      width,
      height
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes,
    align
  };
  const classes = useUtilityClasses(ownerState);
  const contentWidth = Math.round(randomWidth());
  return /*#__PURE__*/_jsx("div", _extends({
    className: classes.root,
    style: {
      height,
      maxWidth: width,
      minWidth: width
    }
  }, other, {
    children: /*#__PURE__*/_jsx(Skeleton, {
      width: `${contentWidth}%`,
      height: 25
    })
  }));
}
process.env.NODE_ENV !== "production" ? GridSkeletonCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  align: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  width: PropTypes.number.isRequired
} : void 0;
const Memoized = fastMemo(GridSkeletonCell);
export { Memoized as GridSkeletonCell };