import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '@mui/utils/capitalize';
import useThemePropsSystem from '../useThemeProps';
import systemStyled from '../styled';
import createTheme from '../createTheme';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultTheme = createTheme();
const defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
  }
});
const useThemePropsDefault = inProps => useThemePropsSystem({
  props: inProps,
  name: 'MuiContainer',
  defaultTheme
});
const useUtilityClasses = (ownerState, componentName) => {
  const getContainerUtilityClass = slot => {
    return generateUtilityClass(componentName, slot);
  };
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth
  } = ownerState;
  const slots = {
    root: ['root', maxWidth && `maxWidth${capitalize(String(maxWidth))}`, fixed && 'fixed', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
export default function createContainer(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiContainer'
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => _extends({
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    marginRight: 'auto',
    display: 'block'
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      // @ts-ignore
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => _extends({}, ownerState.maxWidth === 'xs' && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up('xs')]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }, ownerState.maxWidth &&
  // @ts-ignore module augmentation fails if custom breakpoints are used
  ownerState.maxWidth !== 'xs' && {
    // @ts-ignore module augmentation fails if custom breakpoints are used
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  }));
  const Container = /*#__PURE__*/React.forwardRef(function Container(inProps, ref) {
    const props = useThemeProps(inProps);
    const {
        className,
        component = 'div',
        disableGutters = false,
        fixed = false,
        maxWidth = 'lg'
      } = props,
      other = _objectWithoutPropertiesLoose(props, _excluded);
    const ownerState = _extends({}, props, {
      component,
      disableGutters,
      fixed,
      maxWidth
    });

    // @ts-ignore module augmentation fails if custom breakpoints are used
    const classes = useUtilityClasses(ownerState, componentName);
    return (
      /*#__PURE__*/
      // @ts-ignore theme is injected by the styled util
      _jsx(ContainerRoot, _extends({
        as: component
        // @ts-ignore module augmentation fails if custom breakpoints are used
        ,
        ownerState: ownerState,
        className: clsx(classes.root, className),
        ref: ref
      }, other))
    );
  });
  process.env.NODE_ENV !== "production" ? Container.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.elementType,
    disableGutters: PropTypes.bool,
    fixed: PropTypes.bool,
    maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), PropTypes.string]),
    sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
  } : void 0;
  return Container;
}