'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _span;
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useSelect } from '../useSelect';
import { useSlotProps } from '../utils';
import { Popup } from '../Unstable_Popup/Popup';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getSelectUtilityClass } from './selectClasses';
import { defaultOptionStringifier } from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { SelectProvider } from '../useSelect/SelectProvider';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function defaultRenderValue(selectedOptions) {
  var _selectedOptions$labe;
  if (Array.isArray(selectedOptions)) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: selectedOptions.map(function (o) {
        return o.label;
      }).join(', ')
    });
  }
  return (_selectedOptions$labe = selectedOptions == null ? void 0 : selectedOptions.label) != null ? _selectedOptions$labe : null;
}
function useUtilityClasses(ownerState) {
  var active = ownerState.active,
    disabled = ownerState.disabled,
    open = ownerState.open,
    focusVisible = ownerState.focusVisible;
  var slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popup: ['popup']
  };
  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/base-ui/react-select/components-api/#select)
 */
var Select = /*#__PURE__*/React.forwardRef(function Select(props, forwardedRef) {
  var _slots$root, _slots$listbox, _slots$popup, _ref, _renderValue;
  var areOptionsEqual = props.areOptionsEqual,
    autoComplete = props.autoComplete,
    autoFocus = props.autoFocus,
    children = props.children,
    defaultValue = props.defaultValue,
    _props$defaultListbox = props.defaultListboxOpen,
    defaultListboxOpen = _props$defaultListbox === void 0 ? false : _props$defaultListbox,
    disabledProp = props.disabled,
    getSerializedValue = props.getSerializedValue,
    listboxId = props.listboxId,
    listboxOpenProp = props.listboxOpen,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple,
    name = props.name,
    _props$required = props.required,
    required = _props$required === void 0 ? false : _props$required,
    onChange = props.onChange,
    onListboxOpenChange = props.onListboxOpenChange,
    _props$getOptionAsStr = props.getOptionAsString,
    getOptionAsString = _props$getOptionAsStr === void 0 ? defaultOptionStringifier : _props$getOptionAsStr,
    renderValueProp = props.renderValue,
    placeholder = props.placeholder,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    valueProp = props.value,
    other = _objectWithoutProperties(props, ["areOptionsEqual", "autoComplete", "autoFocus", "children", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "multiple", "name", "required", "onChange", "onListboxOpenChange", "getOptionAsString", "renderValue", "placeholder", "slotProps", "slots", "value"]);
  var renderValue = renderValueProp != null ? renderValueProp : defaultRenderValue;
  var _React$useState = React.useState(false),
    buttonDefined = _React$useState[0],
    setButtonDefined = _React$useState[1];
  var buttonRef = React.useRef(null);
  var listboxRef = React.useRef(null);
  var Button = (_slots$root = slots.root) != null ? _slots$root : 'button';
  var ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : 'ul';
  var PopupComponent = (_slots$popup = slots.popup) != null ? _slots$popup : 'div';
  var handleButtonRefChange = React.useCallback(function (element) {
    setButtonDefined(element != null);
  }, []);
  var handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
  React.useEffect(function () {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);
  var _useSelect = useSelect({
      name: name,
      required: required,
      getSerializedValue: getSerializedValue,
      areOptionsEqual: areOptionsEqual,
      buttonRef: handleButtonRef,
      defaultOpen: defaultListboxOpen,
      defaultValue: defaultValue,
      disabled: disabledProp,
      listboxId: listboxId,
      multiple: multiple,
      open: listboxOpenProp,
      onChange: onChange,
      onOpenChange: onListboxOpenChange,
      getOptionAsString: getOptionAsString,
      value: valueProp,
      componentName: 'Select'
    }),
    buttonActive = _useSelect.buttonActive,
    buttonFocusVisible = _useSelect.buttonFocusVisible,
    contextValue = _useSelect.contextValue,
    disabled = _useSelect.disabled,
    getButtonProps = _useSelect.getButtonProps,
    getListboxProps = _useSelect.getListboxProps,
    getHiddenInputProps = _useSelect.getHiddenInputProps,
    getOptionMetadata = _useSelect.getOptionMetadata,
    value = _useSelect.value,
    open = _useSelect.open;
  var ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen: defaultListboxOpen,
    disabled: disabled,
    focusVisible: buttonFocusVisible,
    open: open,
    multiple: multiple,
    renderValue: renderValue,
    value: value
  });
  var classes = useUtilityClasses(ownerState);
  var buttonProps = useSlotProps({
    elementType: Button,
    getSlotProps: getButtonProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState: ownerState,
    className: classes.root
  });
  var listboxProps = useSlotProps({
    elementType: ListboxRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    additionalProps: {
      ref: listboxRef
    },
    ownerState: ownerState,
    className: classes.listbox
  });
  var popupProps = useSlotProps({
    elementType: PopupComponent,
    externalSlotProps: slotProps.popup,
    additionalProps: {
      anchor: buttonRef.current,
      keepMounted: true,
      open: open,
      placement: 'bottom-start',
      role: undefined
    },
    ownerState: ownerState,
    className: classes.popup
  });
  var selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = value.map(function (v) {
      return getOptionMetadata(v);
    }).filter(function (o) {
      return o !== undefined;
    });
  } else {
    var _getOptionMetadata;
    selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(value)) != null ? _getOptionMetadata : null;
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Button, _extends({}, buttonProps, {
      children: (_ref = (_renderValue = renderValue(selectedOptionsMetadata)) != null ? _renderValue : placeholder) != null ? _ref : // fall back to a zero-width space to prevent layout shift
      // from https://github.com/mui/material-ui/pull/24563
      _span || (_span = /*#__PURE__*/_jsx("span", {
        className: "notranslate",
        children: "\u200B"
      }))
    })), buttonDefined && /*#__PURE__*/_jsx(Popup, _extends({
      slots: {
        root: PopupComponent
      }
    }, popupProps, {
      children: /*#__PURE__*/_jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/_jsx(SelectProvider, {
          value: contextValue,
          children: children
        })
      }))
    })), /*#__PURE__*/_jsx("input", _extends({}, getHiddenInputProps(), {
      autoComplete: autoComplete
    }))]
  });
});
process.env.NODE_ENV !== "production" ? Select.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A function used to determine if two options' values are equal.
   * By default, reference equality is used.
   *
   * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
   * Therefore, it's recommented to use the default reference equality comparison whenever possible.
   */
  areOptionsEqual: PropTypes.func,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  getOptionAsString: PropTypes.func,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: PropTypes.func,
  /**
   * `id` attribute of the listbox element.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
   *
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   */
  name: PropTypes.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Text to show when there is no selected value.
   */
  placeholder: PropTypes.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, the Select cannot be empty when submitting form.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popup: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.elementType,
    popup: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any
} : void 0;
export { Select };