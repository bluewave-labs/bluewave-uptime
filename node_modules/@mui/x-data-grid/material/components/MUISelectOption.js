import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["native"];
import * as React from 'react';
import MUIMenuItem from '@mui/material/MenuItem';
import { jsx as _jsx } from "react/jsx-runtime";
export default function MUISelectOption(_ref) {
  let {
      native
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (native) {
    return /*#__PURE__*/_jsx("option", _extends({}, props));
  }
  return /*#__PURE__*/_jsx(MUIMenuItem, _extends({}, props));
}