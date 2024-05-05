import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "children", "columns", "container", "component", "direction", "wrap", "spacing", "rowSpacing", "columnSpacing", "disableEqualOverflow", "unstable_level"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import isMuiElement from '@mui/utils/isMuiElement';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import useTheme from '../useTheme';
import { extendSxProp } from '../styleFunctionSx';
import createTheme from '../createTheme';
import { generateGridStyles, generateGridSizeStyles, generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridDirectionStyles, generateGridOffsetStyles, generateSizeClassNames, generateSpacingClassNames, generateDirectionClasses } from './gridGenerator';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultTheme = createTheme();

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
});
function useThemePropsDefault(props) {
  return useThemePropsSystem({
    props,
    name: 'MuiGrid',
    defaultTheme
  });
}
export default function createGrid(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiGrid'
  } = options;
  const GridOverflowContext = /*#__PURE__*/React.createContext(undefined);
  if (process.env.NODE_ENV !== 'production') {
    GridOverflowContext.displayName = 'GridOverflowContext';
  }
  const useUtilityClasses = (ownerState, theme) => {
    const {
      container,
      direction,
      spacing,
      wrap,
      gridSize
    } = ownerState;
    const slots = {
      root: ['root', container && 'container', wrap !== 'wrap' && `wrap-xs-${String(wrap)}`, ...generateDirectionClasses(direction), ...generateSizeClassNames(gridSize), ...(container ? generateSpacingClassNames(spacing, theme.breakpoints.keys[0]) : [])]
    };
    return composeClasses(slots, slot => generateUtilityClass(componentName, slot), {});
  };
  const GridRoot = createStyledComponent(generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridSizeStyles, generateGridDirectionStyles, generateGridStyles, generateGridOffsetStyles);
  const Grid = /*#__PURE__*/React.forwardRef(function Grid(inProps, ref) {
    const theme = useTheme();
    const themeProps = useThemeProps(inProps);
    const props = extendSxProp(themeProps); // `color` type conflicts with html color attribute.
    const overflow = React.useContext(GridOverflowContext);
    const {
        className,
        children,
        columns: columnsProp = 12,
        container = false,
        component = 'div',
        direction = 'row',
        wrap = 'wrap',
        spacing: spacingProp = 0,
        rowSpacing: rowSpacingProp = spacingProp,
        columnSpacing: columnSpacingProp = spacingProp,
        disableEqualOverflow: themeDisableEqualOverflow,
        unstable_level: level = 0
      } = props,
      rest = _objectWithoutPropertiesLoose(props, _excluded);
    // Because `disableEqualOverflow` can be set from the theme's defaultProps, the **nested** grid should look at the instance props instead.
    let disableEqualOverflow = themeDisableEqualOverflow;
    if (level && themeDisableEqualOverflow !== undefined) {
      disableEqualOverflow = inProps.disableEqualOverflow;
    }
    // collect breakpoints related props because they can be customized from the theme.
    const gridSize = {};
    const gridOffset = {};
    const other = {};
    Object.entries(rest).forEach(([key, val]) => {
      if (theme.breakpoints.values[key] !== undefined) {
        gridSize[key] = val;
      } else if (theme.breakpoints.values[key.replace('Offset', '')] !== undefined) {
        gridOffset[key.replace('Offset', '')] = val;
      } else {
        other[key] = val;
      }
    });
    const columns = inProps.columns ?? (level ? undefined : columnsProp);
    const spacing = inProps.spacing ?? (level ? undefined : spacingProp);
    const rowSpacing = inProps.rowSpacing ?? inProps.spacing ?? (level ? undefined : rowSpacingProp);
    const columnSpacing = inProps.columnSpacing ?? inProps.spacing ?? (level ? undefined : columnSpacingProp);
    const ownerState = _extends({}, props, {
      level,
      columns,
      container,
      direction,
      wrap,
      spacing,
      rowSpacing,
      columnSpacing,
      gridSize,
      gridOffset,
      disableEqualOverflow: disableEqualOverflow ?? overflow ?? false,
      // use context value if exists.
      parentDisableEqualOverflow: overflow // for nested grid
    });
    const classes = useUtilityClasses(ownerState, theme);
    let result = /*#__PURE__*/_jsx(GridRoot, _extends({
      ref: ref,
      as: component,
      ownerState: ownerState,
      className: clsx(classes.root, className)
    }, other, {
      children: React.Children.map(children, child => {
        if ( /*#__PURE__*/React.isValidElement(child) && isMuiElement(child, ['Grid'])) {
          return /*#__PURE__*/React.cloneElement(child, {
            unstable_level: child.props.unstable_level ?? level + 1
          });
        }
        return child;
      })
    }));
    if (disableEqualOverflow !== undefined && disableEqualOverflow !== (overflow ?? false)) {
      // There are 2 possibilities that should wrap with the GridOverflowContext to communicate with the nested grids:
      // 1. It is the root grid with `disableEqualOverflow`.
      // 2. It is a nested grid with different `disableEqualOverflow` from the context.
      result = /*#__PURE__*/_jsx(GridOverflowContext.Provider, {
        value: disableEqualOverflow,
        children: result
      });
    }
    return result;
  });
  process.env.NODE_ENV !== "production" ? Grid.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    className: PropTypes.string,
    columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number, PropTypes.object]),
    columnSpacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
    component: PropTypes.elementType,
    container: PropTypes.bool,
    direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),
    disableEqualOverflow: PropTypes.bool,
    lg: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    lgOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    mdOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    rowSpacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
    sm: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    smOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
    sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
    wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    xl: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    xlOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    xs: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
    xsOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number])
  } : void 0;

  // @ts-ignore internal logic for nested grid
  Grid.muiName = 'Grid';
  return Grid;
}