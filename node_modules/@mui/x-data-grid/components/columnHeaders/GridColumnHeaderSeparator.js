import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["resizable", "resizing", "height", "side"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, unstable_capitalize as capitalize } from '@mui/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
var GridColumnHeaderSeparatorSides = /*#__PURE__*/function (GridColumnHeaderSeparatorSides) {
  GridColumnHeaderSeparatorSides["Left"] = "left";
  GridColumnHeaderSeparatorSides["Right"] = "right";
  return GridColumnHeaderSeparatorSides;
}(GridColumnHeaderSeparatorSides || {});
const useUtilityClasses = ownerState => {
  const {
    resizable,
    resizing,
    classes,
    side
  } = ownerState;
  const slots = {
    root: ['columnSeparator', resizable && 'columnSeparator--resizable', resizing && 'columnSeparator--resizing', side && `columnSeparator--side${capitalize(side)}`],
    icon: ['iconSeparator']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridColumnHeaderSeparatorRaw(props) {
  const {
      height,
      side = GridColumnHeaderSeparatorSides.Right
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  const ownerState = _extends({}, props, {
    side,
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const stopClick = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    _jsx("div", _extends({
      className: classes.root,
      style: {
        minHeight: height,
        opacity: rootProps.showColumnVerticalBorder ? 0 : 1
      }
    }, other, {
      onClick: stopClick,
      children: /*#__PURE__*/_jsx(rootProps.slots.columnResizeIcon, {
        className: classes.icon
      })
    }))
  );
}
const GridColumnHeaderSeparator = /*#__PURE__*/React.memo(GridColumnHeaderSeparatorRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSeparatorRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  height: PropTypes.number.isRequired,
  resizable: PropTypes.bool.isRequired,
  resizing: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['left', 'right'])
} : void 0;
export { GridColumnHeaderSeparator, GridColumnHeaderSeparatorSides };