'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import styled from '@mui/styled-engine';
import styleFunctionSx, { extendSxProp } from './styleFunctionSx';
import useTheme from './useTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export default function createBox() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeId = options.themeId,
    defaultTheme = options.defaultTheme,
    _options$defaultClass = options.defaultClassName,
    defaultClassName = _options$defaultClass === void 0 ? 'MuiBox-root' : _options$defaultClass,
    generateClassName = options.generateClassName;
  var BoxRoot = styled('div', {
    shouldForwardProp: function shouldForwardProp(prop) {
      return prop !== 'theme' && prop !== 'sx' && prop !== 'as';
    }
  })(styleFunctionSx);
  var Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
    var theme = useTheme(defaultTheme);
    var _extendSxProp = extendSxProp(inProps),
      className = _extendSxProp.className,
      _extendSxProp$compone = _extendSxProp.component,
      component = _extendSxProp$compone === void 0 ? 'div' : _extendSxProp$compone,
      other = _objectWithoutProperties(_extendSxProp, ["className", "component"]);
    return /*#__PURE__*/_jsx(BoxRoot, _extends({
      as: component,
      ref: ref,
      className: clsx(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme
    }, other));
  });
  return Box;
}