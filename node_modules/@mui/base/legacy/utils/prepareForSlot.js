import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
export function prepareForSlot(Component) {
  return /*#__PURE__*/React.forwardRef(function Slot(props, ref) {
    var ownerState = props.ownerState,
      other = _objectWithoutProperties(props, ["ownerState"]);
    return /*#__PURE__*/React.createElement(Component, _extends({}, other, {
      ref: ref
    }));
  });
}