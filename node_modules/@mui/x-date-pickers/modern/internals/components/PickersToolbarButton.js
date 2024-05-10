import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["align", "className", "selected", "typographyClassName", "value", "variant", "width"];
import * as React from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { PickersToolbarText } from './PickersToolbarText';
import { getPickersToolbarUtilityClass } from './pickersToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getPickersToolbarUtilityClass, classes);
};
const PickersToolbarButtonRoot = styled(Button, {
  name: 'MuiPickersToolbarButton',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  padding: 0,
  minWidth: 16,
  textTransform: 'none'
});
export const PickersToolbarButton = /*#__PURE__*/React.forwardRef(function PickersToolbarButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersToolbarButton'
  });
  const {
      align,
      className,
      selected,
      typographyClassName,
      value,
      variant,
      width
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(props);
  return /*#__PURE__*/_jsx(PickersToolbarButtonRoot, _extends({
    variant: "text",
    ref: ref,
    className: clsx(className, classes.root)
  }, width ? {
    sx: {
      width
    }
  } : {}, other, {
    children: /*#__PURE__*/_jsx(PickersToolbarText, {
      align: align,
      className: typographyClassName,
      variant: variant,
      value: value,
      selected: selected
    })
  }));
});