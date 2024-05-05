'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _toArray from "@babel/runtime/helpers/esm/toArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import Collapse from '../Collapse';
import Paper from '../Paper';
import AccordionContext from './AccordionContext';
import useControlled from '../utils/useControlled';
import useSlot from '../utils/useSlot';
import accordionClasses, { getAccordionUtilityClass } from './accordionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useThemeProps = createUseThemeProps('MuiAccordion');
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    square = ownerState.square,
    expanded = ownerState.expanded,
    disabled = ownerState.disabled,
    disableGutters = ownerState.disableGutters;
  var slots = {
    root: ['root', !square && 'rounded', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    region: ['region']
  };
  return composeClasses(slots, getAccordionUtilityClass, classes);
};
var AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [_defineProperty({}, "& .".concat(accordionClasses.region), styles.region), styles.root, !ownerState.square && styles.rounded, !ownerState.disableGutters && styles.gutters];
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return _defineProperty(_defineProperty({
    position: 'relative',
    transition: theme.transitions.create(['margin'], transition),
    overflowAnchor: 'none',
    // Keep the same scrolling position
    '&::before': {
      position: 'absolute',
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: (theme.vars || theme).palette.divider,
      transition: theme.transitions.create(['opacity', 'background-color'], transition)
    },
    '&:first-of-type': {
      '&::before': {
        display: 'none'
      }
    }
  }, "&.".concat(accordionClasses.expanded), {
    '&::before': {
      opacity: 0
    },
    '&:first-of-type': {
      marginTop: 0
    },
    '&:last-of-type': {
      marginBottom: 0
    },
    '& + &': {
      '&::before': {
        display: 'none'
      }
    }
  }), "&.".concat(accordionClasses.disabled), {
    backgroundColor: (theme.vars || theme).palette.action.disabledBackground
  });
}, function (_ref4) {
  var theme = _ref4.theme;
  return {
    variants: [{
      props: function props(_props) {
        return !_props.square;
      },
      style: {
        borderRadius: 0,
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius
        },
        '&:last-of-type': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
          // Fix a rendering issue on Edge
          '@supports (-ms-ime-align: auto)': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }
        }
      }
    }, {
      props: function props(_props2) {
        return !_props2.disableGutters;
      },
      style: _defineProperty({}, "&.".concat(accordionClasses.expanded), {
        margin: '16px 0'
      })
    }]
  };
});
var Accordion = /*#__PURE__*/React.forwardRef(function Accordion(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAccordion'
  });
  var childrenProp = props.children,
    className = props.className,
    _props$defaultExpande = props.defaultExpanded,
    defaultExpanded = _props$defaultExpande === void 0 ? false : _props$defaultExpande,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableGutters = props.disableGutters,
    disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
    expandedProp = props.expanded,
    onChange = props.onChange,
    _props$square = props.square,
    square = _props$square === void 0 ? false : _props$square,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    TransitionComponentProp = props.TransitionComponent,
    TransitionPropsProp = props.TransitionProps,
    other = _objectWithoutProperties(props, ["children", "className", "defaultExpanded", "disabled", "disableGutters", "expanded", "onChange", "square", "slots", "slotProps", "TransitionComponent", "TransitionProps"]);
  var _useControlled = useControlled({
      controlled: expandedProp,
      default: defaultExpanded,
      name: 'Accordion',
      state: 'expanded'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    expanded = _useControlled2[0],
    setExpandedState = _useControlled2[1];
  var handleChange = React.useCallback(function (event) {
    setExpandedState(!expanded);
    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);
  var _React$Children$toArr = React.Children.toArray(childrenProp),
    _React$Children$toArr2 = _toArray(_React$Children$toArr),
    summary = _React$Children$toArr2[0],
    children = _React$Children$toArr2.slice(1);
  var contextValue = React.useMemo(function () {
    return {
      expanded: expanded,
      disabled: disabled,
      disableGutters: disableGutters,
      toggle: handleChange
    };
  }, [expanded, disabled, disableGutters, handleChange]);
  var ownerState = _extends({}, props, {
    square: square,
    disabled: disabled,
    disableGutters: disableGutters,
    expanded: expanded
  });
  var classes = useUtilityClasses(ownerState);
  var backwardCompatibleSlots = _extends({
    transition: TransitionComponentProp
  }, slots);
  var backwardCompatibleSlotProps = _extends({
    transition: TransitionPropsProp
  }, slotProps);
  var _useSlot = useSlot('transition', {
      elementType: Collapse,
      externalForwardedProps: {
        slots: backwardCompatibleSlots,
        slotProps: backwardCompatibleSlotProps
      },
      ownerState: ownerState
    }),
    _useSlot2 = _slicedToArray(_useSlot, 2),
    TransitionSlot = _useSlot2[0],
    transitionProps = _useSlot2[1];
  return /*#__PURE__*/_jsxs(AccordionRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState,
    square: square
  }, other, {
    children: [/*#__PURE__*/_jsx(AccordionContext.Provider, {
      value: contextValue,
      children: summary
    }), /*#__PURE__*/_jsx(TransitionSlot, _extends({
      in: expanded,
      timeout: "auto"
    }, transitionProps, {
      children: /*#__PURE__*/_jsx("div", {
        "aria-labelledby": summary.props.id,
        id: summary.props['aria-controls'],
        role: "region",
        className: classes.region,
        children: children
      })
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? Accordion.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, function (props) {
    var summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error("MUI: The Accordion doesn't accept a Fragment as a child. " + 'Consider providing an array instead.');
    }
    if (! /*#__PURE__*/React.isValidElement(summary)) {
      return new Error('MUI: Expected the first child of Accordion to be a valid element.');
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and the increase of height.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    transition: PropTypes.elementType
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Accordion;