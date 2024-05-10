"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePicker = void 0;
var _usePickerValue = require("./usePickerValue");
var _usePickerViews = require("./usePickerViews");
var _usePickerLayoutProps = require("./usePickerLayoutProps");
var _warning = require("../../utils/warning");
const warnRenderInputIsDefined = (0, _warning.buildWarning)(['The `renderInput` prop has been removed in version 6.0 of the Date and Time Pickers.', 'You can replace it with the `textField` component slot in most cases.', 'For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5).']);
const usePicker = ({
  props,
  valueManager,
  valueType,
  wrapperVariant,
  additionalViewProps,
  validator,
  autoFocusView,
  rendererInterceptor,
  fieldRef
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (props.renderInput != null) {
      warnRenderInputIsDefined();
    }
  }
  const pickerValueResponse = (0, _usePickerValue.usePickerValue)({
    props,
    valueManager,
    valueType,
    wrapperVariant,
    validator
  });
  const pickerViewsResponse = (0, _usePickerViews.usePickerViews)({
    props,
    additionalViewProps,
    autoFocusView,
    fieldRef,
    propsFromPickerValue: pickerValueResponse.viewProps,
    rendererInterceptor
  });
  const pickerLayoutResponse = (0, _usePickerLayoutProps.usePickerLayoutProps)({
    props,
    wrapperVariant,
    propsFromPickerValue: pickerValueResponse.layoutProps,
    propsFromPickerViews: pickerViewsResponse.layoutProps
  });
  return {
    // Picker value
    open: pickerValueResponse.open,
    actions: pickerValueResponse.actions,
    fieldProps: pickerValueResponse.fieldProps,
    // Picker views
    renderCurrentView: pickerViewsResponse.renderCurrentView,
    hasUIView: pickerViewsResponse.hasUIView,
    shouldRestoreFocus: pickerViewsResponse.shouldRestoreFocus,
    // Picker layout
    layoutProps: pickerLayoutResponse.layoutProps
  };
};
exports.usePicker = usePicker;