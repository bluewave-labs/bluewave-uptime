'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var disableGutters = ownerState.disableGutters,
    classes = ownerState.classes;
  var slots = {
    root: ['root', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};
var ListItemSecondaryActionRoot = styled('div', {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.disableGutters && styles.disableGutters];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)'
  }, ownerState.disableGutters && {
    right: 0
  });
});

/**
 * Must be used as the last child of ListItem to function properly.
 */
var ListItemSecondaryAction = /*#__PURE__*/React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemSecondaryAction'
  });
  var className = props.className,
    other = _objectWithoutProperties(props, ["className"]);
  var context = React.useContext(ListContext);
  var ownerState = _extends({}, props, {
    disableGutters: context.disableGutters
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(ListItemSecondaryActionRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemSecondaryAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
export default ListItemSecondaryAction;