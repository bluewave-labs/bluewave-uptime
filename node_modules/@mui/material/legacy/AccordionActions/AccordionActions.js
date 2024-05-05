'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import { getAccordionActionsUtilityClass } from './accordionActionsClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useThemeProps = createUseThemeProps('MuiAccordionActions');
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disableSpacing = ownerState.disableSpacing;
  var slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};
var AccordionActionsRoot = styled('div', {
  name: 'MuiAccordionActions',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  variants: [{
    props: function props(_props) {
      return !_props.disableSpacing;
    },
    style: {
      '& > :not(style) ~ :not(style)': {
        marginLeft: 8
      }
    }
  }]
});
var AccordionActions = /*#__PURE__*/React.forwardRef(function AccordionActions(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAccordionActions'
  });
  var className = props.className,
    _props$disableSpacing = props.disableSpacing,
    disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
    other = _objectWithoutProperties(props, ["className", "disableSpacing"]);
  var ownerState = _extends({}, props, {
    disableSpacing: disableSpacing
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(AccordionActionsRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other));
});
process.env.NODE_ENV !== "production" ? AccordionActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default AccordionActions;