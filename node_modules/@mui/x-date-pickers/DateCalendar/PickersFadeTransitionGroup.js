import * as React from 'react';
import clsx from 'clsx';
import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import { getPickersFadeTransitionGroupUtilityClass } from './pickersFadeTransitionGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getPickersFadeTransitionGroupUtilityClass, classes);
};
const PickersFadeTransitionGroupRoot = styled(TransitionGroup, {
  name: 'MuiPickersFadeTransitionGroup',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  display: 'block',
  position: 'relative'
});

/**
 * @ignore - do not document.
 */
export function PickersFadeTransitionGroup(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersFadeTransitionGroup'
  });
  const {
    children,
    className,
    reduceAnimations,
    transKey
  } = props;
  const classes = useUtilityClasses(props);
  const theme = useTheme();
  if (reduceAnimations) {
    return children;
  }
  return /*#__PURE__*/_jsx(PickersFadeTransitionGroupRoot, {
    className: clsx(classes.root, className),
    children: /*#__PURE__*/_jsx(Fade, {
      appear: false,
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: {
        appear: theme.transitions.duration.enteringScreen,
        enter: theme.transitions.duration.enteringScreen,
        exit: 0
      },
      children: children
    }, transKey)
  });
}