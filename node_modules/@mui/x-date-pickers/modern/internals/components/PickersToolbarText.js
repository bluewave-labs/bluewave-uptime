import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "selected", "value"];
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { getPickersToolbarTextUtilityClass, pickersToolbarTextClasses } from './pickersToolbarTextClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes,
    selected
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected']
  };
  return composeClasses(slots, getPickersToolbarTextUtilityClass, classes);
};
const PickersToolbarTextRoot = styled(Typography, {
  name: 'MuiPickersToolbarText',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root, {
    [`&.${pickersToolbarTextClasses.selected}`]: styles.selected
  }]
})(({
  theme
}) => ({
  transition: theme.transitions.create('color'),
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${pickersToolbarTextClasses.selected}`]: {
    color: (theme.vars || theme).palette.text.primary
  }
}));
export const PickersToolbarText = /*#__PURE__*/React.forwardRef(function PickersToolbarText(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersToolbarText'
  });
  const {
      className,
      value
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(props);
  return /*#__PURE__*/_jsx(PickersToolbarTextRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root),
    component: "span"
  }, other, {
    children: value
  }));
});