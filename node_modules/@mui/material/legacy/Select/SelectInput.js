'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
var _span;
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useId from '@mui/utils/useId';
import refType from '@mui/utils/refType';
import ownerDocument from '../utils/ownerDocument';
import capitalize from '../utils/capitalize';
import Menu from '../Menu/Menu';
import { nativeSelectSelectStyles, nativeSelectIconStyles } from '../NativeSelect/NativeSelectInput';
import { isFilled } from '../InputBase/utils';
import styled, { slotShouldForwardProp } from '../styles/styled';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import selectClasses, { getSelectUtilityClasses } from './selectClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SelectSelect = styled('div', {
  name: 'MuiSelect',
  slot: 'Select',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [// Win specificity over the input base
    _defineProperty({}, "&.".concat(selectClasses.select), styles.select), _defineProperty({}, "&.".concat(selectClasses.select), styles[ownerState.variant]), _defineProperty({}, "&.".concat(selectClasses.error), styles.error), _defineProperty({}, "&.".concat(selectClasses.multiple), styles.multiple)];
  }
})(nativeSelectSelectStyles, _defineProperty({}, "&.".concat(selectClasses.select), {
  height: 'auto',
  // Resets for multiple select with chips
  minHeight: '1.4375em',
  // Required for select\text-field height consistency
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}));
var SelectIcon = styled('svg', {
  name: 'MuiSelect',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.icon, ownerState.variant && styles["icon".concat(capitalize(ownerState.variant))], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);
var SelectNativeInput = styled('input', {
  shouldForwardProp: function shouldForwardProp(prop) {
    return slotShouldForwardProp(prop) && prop !== 'classes';
  },
  name: 'MuiSelect',
  slot: 'NativeInput',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.nativeInput;
  }
})({
  bottom: 0,
  left: 0,
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: '100%',
  boxSizing: 'border-box'
});
function areEqualValues(a, b) {
  if (_typeof(b) === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}
function isEmpty(display) {
  return display == null || typeof display === 'string' && !display.trim();
}
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    variant = ownerState.variant,
    disabled = ownerState.disabled,
    multiple = ownerState.multiple,
    open = ownerState.open,
    error = ownerState.error;
  var slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', "icon".concat(capitalize(variant)), open && 'iconOpen', disabled && 'disabled'],
    nativeInput: ['nativeInput']
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};

/**
 * @ignore - internal component.
 */
var SelectInput = /*#__PURE__*/React.forwardRef(function SelectInput(props, ref) {
  var _MenuProps$slotProps;
  var ariaDescribedby = props['aria-describedby'],
    ariaLabel = props['aria-label'],
    autoFocus = props.autoFocus,
    autoWidth = props.autoWidth,
    children = props.children,
    className = props.className,
    defaultOpen = props.defaultOpen,
    defaultValue = props.defaultValue,
    disabled = props.disabled,
    displayEmpty = props.displayEmpty,
    _props$error = props.error,
    error = _props$error === void 0 ? false : _props$error,
    IconComponent = props.IconComponent,
    inputRefProp = props.inputRef,
    labelId = props.labelId,
    _props$MenuProps = props.MenuProps,
    MenuProps = _props$MenuProps === void 0 ? {} : _props$MenuProps,
    multiple = props.multiple,
    name = props.name,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onClose = props.onClose,
    onFocus = props.onFocus,
    onOpen = props.onOpen,
    openProp = props.open,
    readOnly = props.readOnly,
    renderValue = props.renderValue,
    _props$SelectDisplayP = props.SelectDisplayProps,
    SelectDisplayProps = _props$SelectDisplayP === void 0 ? {} : _props$SelectDisplayP,
    tabIndexProp = props.tabIndex,
    type = props.type,
    valueProp = props.value,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'standard' : _props$variant,
    other = _objectWithoutProperties(props, ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultOpen", "defaultValue", "disabled", "displayEmpty", "error", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"]);
  var _useControlled = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: 'Select'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValueState = _useControlled2[1];
  var _useControlled3 = useControlled({
      controlled: openProp,
      default: defaultOpen,
      name: 'Select'
    }),
    _useControlled4 = _slicedToArray(_useControlled3, 2),
    openState = _useControlled4[0],
    setOpenState = _useControlled4[1];
  var inputRef = React.useRef(null);
  var displayRef = React.useRef(null);
  var _React$useState = React.useState(null),
    displayNode = _React$useState[0],
    setDisplayNode = _React$useState[1];
  var _React$useRef = React.useRef(openProp != null),
    isOpenControlled = _React$useRef.current;
  var _React$useState2 = React.useState(),
    menuMinWidthState = _React$useState2[0],
    setMenuMinWidthState = _React$useState2[1];
  var handleRef = useForkRef(ref, inputRefProp);
  var handleDisplayRef = React.useCallback(function (node) {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  var anchorElement = displayNode == null ? void 0 : displayNode.parentNode;
  React.useImperativeHandle(handleRef, function () {
    return {
      focus: function focus() {
        displayRef.current.focus();
      },
      node: inputRef.current,
      value: value
    };
  }, [value]);

  // Resize menu on `defaultOpen` automatic toggle.
  React.useEffect(function () {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNode, autoWidth]);
  // `isOpenControlled` is ignored because the component should never switch between controlled and uncontrolled modes.
  // `defaultOpen` and `openState` are ignored to avoid unnecessary callbacks.
  React.useEffect(function () {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  React.useEffect(function () {
    if (!labelId) {
      return undefined;
    }
    var label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      var handler = function handler() {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener('click', handler);
      return function () {
        label.removeEventListener('click', handler);
      };
    }
    return undefined;
  }, [labelId]);
  var update = function update(open, event) {
    if (open) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(open);
    }
  };
  var handleMouseDown = function handleMouseDown(event) {
    // Ignore everything but left-click
    if (event.button !== 0) {
      return;
    }
    // Hijack the default focus behavior.
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  var handleClose = function handleClose(event) {
    update(false, event);
  };
  var childrenArray = React.Children.toArray(children);

  // Support autofill.
  var handleChange = function handleChange(event) {
    var child = childrenArray.find(function (childItem) {
      return childItem.props.value === event.target.value;
    });
    if (child === undefined) {
      return;
    }
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  var handleItemClick = function handleItemClick(child) {
    return function (event) {
      var newValue;

      // We use the tabindex attribute to signal the available options.
      if (!event.currentTarget.hasAttribute('tabindex')) {
        return;
      }
      if (multiple) {
        newValue = Array.isArray(value) ? value.slice() : [];
        var itemIndex = value.indexOf(child.props.value);
        if (itemIndex === -1) {
          newValue.push(child.props.value);
        } else {
          newValue.splice(itemIndex, 1);
        }
      } else {
        newValue = child.props.value;
      }
      if (child.props.onClick) {
        child.props.onClick(event);
      }
      if (value !== newValue) {
        setValueState(newValue);
        if (onChange) {
          // Redefine target to allow name and value to be read.
          // This allows seamless integration with the most popular form libraries.
          // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
          // Clone the event to not override `target` of the original event.
          var nativeEvent = event.nativeEvent || event;
          var clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
          Object.defineProperty(clonedEvent, 'target', {
            writable: true,
            value: {
              value: newValue,
              name: name
            }
          });
          onChange(clonedEvent, child);
        }
      }
      if (!multiple) {
        update(false, event);
      }
    };
  };
  var handleKeyDown = function handleKeyDown(event) {
    if (!readOnly) {
      var validKeys = [' ', 'ArrowUp', 'ArrowDown',
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      'Enter'];
      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  var open = displayNode !== null && openState;
  var handleBlur = function handleBlur(event) {
    // if open event.stopImmediatePropagation
    if (!open && onBlur) {
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, 'target', {
        writable: true,
        value: {
          value: value,
          name: name
        }
      });
      onBlur(event);
    }
  };
  delete other['aria-invalid'];
  var display;
  var displaySingle;
  var displayMultiple = [];
  var computeDisplay = false;
  var foundMatch = false;

  // No need to display any value if the field is empty.
  if (isFilled({
    value: value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  var items = childrenArray.map(function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["MUI: The Select component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }
    var selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : _formatMuiErrorMessage(2));
      }
      selected = value.some(function (v) {
        return areEqualValues(v, child.props.value);
      });
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    if (selected) {
      foundMatch = true;
    }
    return /*#__PURE__*/React.cloneElement(child, {
      'aria-selected': selected ? 'true' : 'false',
      onClick: handleItemClick(child),
      onKeyUp: function onKeyUp(event) {
        if (event.key === ' ') {
          // otherwise our MenuItems dispatches a click event
          // it's not behavior of the native <option> and causes
          // the select to close immediately since we open on space keydown
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: 'option',
      selected: selected,
      value: undefined,
      // The value is most likely not a valid HTML attribute.
      'data-value': child.props.value // Instead, we provide it as a data attribute.
    });
  });
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(function () {
      if (!foundMatch && !multiple && value !== '') {
        var values = childrenArray.map(function (child) {
          return child.props.value;
        });
        console.warn(["MUI: You have provided an out-of-range value `".concat(value, "` for the select ").concat(name ? "(name=\"".concat(name, "\") ") : '', "component."), "Consider providing a value that matches one of the available options or ''.", "The available values are ".concat(values.filter(function (x) {
          return x != null;
        }).map(function (x) {
          return "`".concat(x, "`");
        }).join(', ') || '""', ".")].join('\n'));
      }
    }, [foundMatch, childrenArray, multiple, name, value]);
  }
  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce(function (output, child, index) {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(', ');
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }

  // Avoid performing a layout computation in the render method.
  var menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }
  var tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  var buttonId = SelectDisplayProps.id || (name ? "mui-component-select-".concat(name) : undefined);
  var ownerState = _extends({}, props, {
    variant: variant,
    value: value,
    open: open,
    error: error
  });
  var classes = useUtilityClasses(ownerState);
  var paperProps = _extends({}, MenuProps.PaperProps, (_MenuProps$slotProps = MenuProps.slotProps) == null ? void 0 : _MenuProps$slotProps.paper);
  var listboxId = useId();
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(SelectSelect, _extends({
      ref: handleDisplayRef,
      tabIndex: tabIndex,
      role: "combobox",
      "aria-controls": listboxId,
      "aria-disabled": disabled ? 'true' : undefined,
      "aria-expanded": open ? 'true' : 'false',
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(' ') || undefined,
      "aria-describedby": ariaDescribedby,
      onKeyDown: handleKeyDown,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus: onFocus
    }, SelectDisplayProps, {
      ownerState: ownerState,
      className: clsx(SelectDisplayProps.className, classes.select, className)
      // The id is required for proper a11y
      ,
      id: buttonId,
      children: isEmpty(display) ? // notranslate needed while Google Translate will not fix zero-width space issue
      _span || (_span = /*#__PURE__*/_jsx("span", {
        className: "notranslate",
        children: "\u200B"
      })) : display
    })), /*#__PURE__*/_jsx(SelectNativeInput, _extends({
      "aria-invalid": error,
      value: Array.isArray(value) ? value.join(',') : value,
      name: name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled: disabled,
      className: classes.nativeInput,
      autoFocus: autoFocus,
      ownerState: ownerState
    }, other)), /*#__PURE__*/_jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState: ownerState
    }), /*#__PURE__*/_jsx(Menu, _extends({
      id: "menu-".concat(name || ''),
      anchorEl: anchorElement,
      open: open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    }, MenuProps, {
      MenuListProps: _extends({
        'aria-labelledby': labelId,
        role: 'listbox',
        'aria-multiselectable': multiple ? 'true' : undefined,
        disableListWrap: true,
        id: listboxId
      }, MenuProps.MenuListProps),
      slotProps: _extends({}, MenuProps.slotProps, {
        paper: _extends({}, paperProps, {
          style: _extends({
            minWidth: menuMinWidth
          }, paperProps != null ? paperProps.style : null)
        })
      }),
      children: items
    }))]
  });
});
process.env.NODE_ENV !== "production" ? SelectInput.propTypes = {
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: refType,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  type: PropTypes.any,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default SelectInput;