import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["ownerState"];
import * as React from 'react';
export function prepareForSlot(Component) {
  return /*#__PURE__*/React.forwardRef(function Slot(props, ref) {
    const other = _objectWithoutPropertiesLoose(props, _excluded);
    return /*#__PURE__*/React.createElement(Component, _extends({}, other, {
      ref
    }));
  });
}