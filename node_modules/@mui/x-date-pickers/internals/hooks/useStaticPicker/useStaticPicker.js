import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["props", "ref"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { usePicker } from '../usePicker';
import { LocalizationProvider } from '../../../LocalizationProvider';
import { PickersLayout } from '../../../PickersLayout';
import { DIALOG_WIDTH } from '../../constants/dimensions';
import { jsx as _jsx } from "react/jsx-runtime";
const PickerStaticLayout = styled(PickersLayout)(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));

/**
 * Hook managing all the single-date static pickers:
 * - StaticDatePicker
 * - StaticDateTimePicker
 * - StaticTimePicker
 */
export const useStaticPicker = _ref => {
  let {
      props,
      ref
    } = _ref,
    pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded);
  const {
    localeText,
    slots,
    slotProps,
    className,
    sx,
    displayStaticWrapperAs,
    autoFocus
  } = props;
  const {
    layoutProps,
    renderCurrentView
  } = usePicker(_extends({}, pickerParams, {
    props,
    autoFocusView: autoFocus ?? false,
    fieldRef: undefined,
    additionalViewProps: {},
    wrapperVariant: displayStaticWrapperAs
  }));
  const Layout = slots?.layout ?? PickerStaticLayout;
  const renderPicker = () => /*#__PURE__*/_jsx(LocalizationProvider, {
    localeText: localeText,
    children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps?.layout, {
      slots: slots,
      slotProps: slotProps,
      sx: [...(Array.isArray(sx) ? sx : [sx]), ...(Array.isArray(slotProps?.layout?.sx) ? slotProps.layout.sx : [slotProps?.layout?.sx])],
      className: clsx(className, slotProps?.layout?.className),
      ref: ref,
      children: renderCurrentView()
    }))
  });
  return {
    renderPicker
  };
};