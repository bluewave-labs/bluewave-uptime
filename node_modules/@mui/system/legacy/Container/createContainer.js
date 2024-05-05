import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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
var defaultTheme = createTheme();
var defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles["maxWidth".concat(capitalize(String(ownerState.maxWidth)))], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
  }
});
var useThemePropsDefault = function useThemePropsDefault(inProps) {
  return useThemePropsSystem({
    props: inProps,
    name: 'MuiContainer',
    defaultTheme: defaultTheme
  });
};
var useUtilityClasses = function useUtilityClasses(ownerState, componentName) {
  var getContainerUtilityClass = function getContainerUtilityClass(slot) {
    return generateUtilityClass(componentName, slot);
  };
  var classes = ownerState.classes,
    fixed = ownerState.fixed,
    disableGutters = ownerState.disableGutters,
    maxWidth = ownerState.maxWidth;
  var slots = {
    root: ['root', maxWidth && "maxWidth".concat(capitalize(String(maxWidth))), fixed && 'fixed', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
export default function createContainer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$createStyled = options.createStyledComponent,
    createStyledComponent = _options$createStyled === void 0 ? defaultCreateStyledComponent : _options$createStyled,
    _options$useThemeProp = options.useThemeProps,
    useThemeProps = _options$useThemeProp === void 0 ? useThemePropsDefault : _options$useThemeProp,
    _options$componentNam = options.componentName,
    componentName = _options$componentNam === void 0 ? 'MuiContainer' : _options$componentNam;
  var ContainerRoot = createStyledComponent(function (_ref) {
    var theme = _ref.theme,
      ownerState = _ref.ownerState;
    return _extends({
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      display: 'block'
    }, !ownerState.disableGutters && _defineProperty({
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }, theme.breakpoints.up('sm'), {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }));
  }, function (_ref3) {
    var theme = _ref3.theme,
      ownerState = _ref3.ownerState;
    return ownerState.fixed && Object.keys(theme.breakpoints.values).reduce(function (acc, breakpointValueKey) {
      var breakpoint = breakpointValueKey;
      var value = theme.breakpoints.values[breakpoint];
      if (value !== 0) {
        // @ts-ignore
        acc[theme.breakpoints.up(breakpoint)] = {
          maxWidth: "".concat(value).concat(theme.breakpoints.unit)
        };
      }
      return acc;
    }, {});
  }, function (_ref4) {
    var theme = _ref4.theme,
      ownerState = _ref4.ownerState;
    return _extends({}, ownerState.maxWidth === 'xs' && _defineProperty({}, theme.breakpoints.up('xs'), {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }), ownerState.maxWidth &&
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ownerState.maxWidth !== 'xs' && _defineProperty({}, theme.breakpoints.up(ownerState.maxWidth), {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      maxWidth: "".concat(theme.breakpoints.values[ownerState.maxWidth]).concat(theme.breakpoints.unit)
    }));
  });
  var Container = /*#__PURE__*/React.forwardRef(function Container(inProps, ref) {
    var props = useThemeProps(inProps);
    var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$fixed = props.fixed,
      fixed = _props$fixed === void 0 ? false : _props$fixed,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? 'lg' : _props$maxWidth,
      classesProp = props.classes,
      other = _objectWithoutProperties(props, ["className", "component", "disableGutters", "fixed", "maxWidth", "classes"]);
    var ownerState = _extends({}, props, {
      component: component,
      disableGutters: disableGutters,
      fixed: fixed,
      maxWidth: maxWidth
    });

    // @ts-ignore module augmentation fails if custom breakpoints are used
    var classes = useUtilityClasses(ownerState, componentName);
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