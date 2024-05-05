'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderClasses from './sliderClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useValueLabelClasses = function useValueLabelClasses(props) {
  var open = props.open;
  var utilityClasses = {
    offset: clsx(open && sliderClasses.valueLabelOpen),
    circle: sliderClasses.valueLabelCircle,
    label: sliderClasses.valueLabelLabel
  };
  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
export default function SliderValueLabel(props) {
  var children = props.children,
    className = props.className,
    value = props.value;
  var classes = useValueLabelClasses(props);
  if (!children) {
    return null;
  }
  return /*#__PURE__*/React.cloneElement(children, {
    className: clsx(children.props.className)
  }, /*#__PURE__*/_jsxs(React.Fragment, {
    children: [children.props.children, /*#__PURE__*/_jsx("span", {
      className: clsx(classes.offset, className),
      "aria-hidden": true,
      children: /*#__PURE__*/_jsx("span", {
        className: classes.circle,
        children: /*#__PURE__*/_jsx("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}
process.env.NODE_ENV !== "production" ? SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  value: PropTypes.node
} : void 0;