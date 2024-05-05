'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCardActionsUtilityClass } from './cardActionsClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    disableSpacing = ownerState.disableSpacing;
  var slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return composeClasses(slots, getCardActionsUtilityClass, classes);
};
var CardActionsRoot = styled('div', {
  name: 'MuiCardActions',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    alignItems: 'center',
    padding: 8
  }, !ownerState.disableSpacing && {
    '& > :not(style) ~ :not(style)': {
      marginLeft: 8
    }
  });
});
var CardActions = /*#__PURE__*/React.forwardRef(function CardActions(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCardActions'
  });
  var _props$disableSpacing = props.disableSpacing,
    disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
    className = props.className,
    other = _objectWithoutProperties(props, ["disableSpacing", "className"]);
  var ownerState = _extends({}, props, {
    disableSpacing: disableSpacing
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(CardActionsRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? CardActions.propTypes /* remove-proptypes */ = {
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
export default CardActions;