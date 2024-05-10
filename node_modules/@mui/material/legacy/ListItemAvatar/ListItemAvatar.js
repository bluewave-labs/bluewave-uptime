'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import ListContext from '../List/ListContext';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemAvatarUtilityClass } from './listItemAvatarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var alignItems = ownerState.alignItems,
    classes = ownerState.classes;
  var slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart']
  };
  return composeClasses(slots, getListItemAvatarUtilityClass, classes);
};
var ListItemAvatarRoot = styled('div', {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    minWidth: 56,
    flexShrink: 0
  }, ownerState.alignItems === 'flex-start' && {
    marginTop: 8
  });
});

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */
var ListItemAvatar = /*#__PURE__*/React.forwardRef(function ListItemAvatar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemAvatar'
  });
  var className = props.className,
    other = _objectWithoutProperties(props, ["className"]);
  var context = React.useContext(ListContext);
  var ownerState = _extends({}, props, {
    alignItems: context.alignItems
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(ListItemAvatarRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemAvatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `Avatar`.
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
export default ListItemAvatar;