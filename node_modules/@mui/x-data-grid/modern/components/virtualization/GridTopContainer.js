import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { gridClasses, getDataGridUtilityClass } from '../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = () => {
  const slots = {
    root: ['topContainer']
  };
  return composeClasses(slots, getDataGridUtilityClass, {});
};
const Element = styled('div')({
  position: 'sticky',
  zIndex: 4,
  top: 0,
  '&::after': {
    content: '" "',
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    width: 'var(--DataGrid-rowWidth)',
    backgroundColor: 'var(--DataGrid-rowBorderColor)'
  }
});
export function GridTopContainer(props) {
  const classes = useUtilityClasses();
  return /*#__PURE__*/_jsx(Element, _extends({}, props, {
    className: clsx(classes.root, props.className, gridClasses['container--top']),
    role: "presentation"
  }));
}