'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderClasses from './sliderClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const useValueLabelClasses = props => {
  const {
    open
  } = props;
  const utilityClasses = {
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
  const {
    children,
    className,
    value
  } = props;
  const classes = useValueLabelClasses(props);
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