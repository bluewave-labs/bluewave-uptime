'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableBodyUtilityClass } from './tableBodyClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getTableBodyUtilityClass, classes);
};
var TableBodyRoot = styled('tbody', {
  name: 'MuiTableBody',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'table-row-group'
});
var tablelvl2 = {
  variant: 'body'
};
var defaultComponent = 'tbody';
var TableBody = /*#__PURE__*/React.forwardRef(function TableBody(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTableBody'
  });
  var className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? defaultComponent : _props$component,
    other = _objectWithoutProperties(props, ["className", "component"]);
  var ownerState = _extends({}, props, {
    component: component
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(Tablelvl2Context.Provider, {
    value: tablelvl2,
    children: /*#__PURE__*/_jsx(TableBodyRoot, _extends({
      className: clsx(classes.root, className),
      as: component,
      ref: ref,
      role: component === defaultComponent ? null : 'rowgroup',
      ownerState: ownerState
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? TableBody.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `TableRow`.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default TableBody;