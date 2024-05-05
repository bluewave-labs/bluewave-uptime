'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId, unstable_useEnhancedEffect as useEnhancedEffect, visuallyHidden as visuallyHiddenStyle } from '@mui/utils';
import { useButton } from '../useButton';
import { SelectActionTypes } from './useSelect.types';
import { ListActionTypes, useList } from '../useList';
import { defaultOptionStringifier } from './defaultOptionStringifier';
import { useCompoundParent } from '../useCompound';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { selectReducer } from './selectReducer';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
function defaultFormValueProvider(selectedOption) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return '';
    }
    return JSON.stringify(selectedOption.map(o => o.value));
  }
  if (selectedOption?.value == null) {
    return '';
  }
  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base-ui/react-select/hooks-api/#use-select)
 */
function useSelect(props) {
  const {
    areOptionsEqual,
    buttonRef: buttonRefProp,
    defaultOpen = false,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    name,
    required,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
    getOptionAsString = defaultOptionStringifier,
    getSerializedValue = defaultFormValueProvider,
    value: valueProp,
    componentName = 'useSelect'
  } = props;
  const buttonRef = React.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React.useRef(null);
  const listboxId = useId(listboxIdProp);
  let defaultValue;
  if (valueProp === undefined && defaultValueProp === undefined) {
    defaultValue = [];
  } else if (defaultValueProp !== undefined) {
    if (multiple) {
      defaultValue = defaultValueProp;
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp];
    }
  }
  const value = React.useMemo(() => {
    if (valueProp !== undefined) {
      if (multiple) {
        return valueProp;
      }
      return valueProp == null ? [] : [valueProp];
    }
    return undefined;
  }, [valueProp, multiple]);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const options = React.useMemo(() => {
    if (optionsParam != null) {
      return new Map(optionsParam.map((option, index) => [option.value, {
        value: option.value,
        label: option.label,
        disabled: option.disabled,
        ref: /*#__PURE__*/React.createRef(),
        id: `${listboxId}_${index}`
      }]));
    }
    return subitems;
  }, [optionsParam, subitems, listboxId]);
  const handleListboxRef = useForkRef(listboxRefProp, listboxRef);
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
    rootRef: mergedButtonRef
  } = useButton({
    disabled,
    rootRef: handleButtonRef
  });
  const optionValues = React.useMemo(() => Array.from(options.keys()), [options]);
  const getOptionByValue = React.useCallback(valueToGet => {
    // This can't be simply `options.get(valueToGet)` because of the `areOptionsEqual` prop.
    // If it's provided, we assume that the user wants to compare the options by value.
    if (areOptionsEqual !== undefined) {
      const similarValue = optionValues.find(optionValue => areOptionsEqual(optionValue, valueToGet));
      return options.get(similarValue);
    }
    return options.get(valueToGet);
  }, [options, areOptionsEqual, optionValues]);
  const isItemDisabled = React.useCallback(valueToCheck => {
    const option = getOptionByValue(valueToCheck);
    return option?.disabled ?? false;
  }, [getOptionByValue]);
  const stringifyOption = React.useCallback(valueToCheck => {
    const option = getOptionByValue(valueToCheck);
    if (!option) {
      return '';
    }
    return getOptionAsString(option);
  }, [getOptionByValue, getOptionAsString]);
  const controlledState = React.useMemo(() => ({
    selectedValues: value,
    open: openProp
  }), [value, openProp]);
  const getItemId = React.useCallback(itemValue => options.get(itemValue)?.id, [options]);
  const handleSelectionChange = React.useCallback((event, newValues) => {
    if (multiple) {
      onChange?.(event, newValues);
    } else {
      onChange?.(event, newValues[0] ?? null);
    }
  }, [multiple, onChange]);
  const handleHighlightChange = React.useCallback((event, newValue) => {
    onHighlightChange?.(event, newValue ?? null);
  }, [onHighlightChange]);
  const handleStateChange = React.useCallback((event, field, fieldValue) => {
    if (field === 'open') {
      onOpenChange?.(fieldValue);
      if (fieldValue === false && event?.type !== 'blur') {
        buttonRef.current?.focus();
      }
    }
  }, [onOpenChange]);
  const getItemDomElement = React.useCallback(itemId => {
    if (itemId == null) {
      return null;
    }
    return subitems.get(itemId)?.ref.current ?? null;
  }, [subitems]);
  const useListParameters = {
    getInitialState: () => ({
      highlightedValue: null,
      selectedValues: defaultValue ?? [],
      open: defaultOpen
    }),
    getItemId,
    controlledProps: controlledState,
    focusManagement: 'DOM',
    getItemDomElement,
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: handleListboxRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React.useMemo(() => ({
      multiple
    }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? 'multiple' : 'single',
    stateReducer: selectReducer,
    componentName
  };
  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue: highlightedOption,
      selectedValues: selectedOptions
    },
    rootRef: mergedListRootRef
  } = useList(useListParameters);

  // store the initial open state to prevent focus stealing
  // (the first option gets focused only when the select is opened by the user)
  const isInitiallyOpen = React.useRef(open);
  useEnhancedEffect(() => {
    if (open && highlightedOption !== null) {
      const optionRef = getOptionByValue(highlightedOption)?.ref;
      if (!listboxRef.current || !optionRef?.current) {
        return;
      }
      if (!isInitiallyOpen.current) {
        optionRef.current.focus({
          preventScroll: true
        });
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [open, highlightedOption, getOptionByValue]);
  const getOptionMetadata = React.useCallback(optionValue => getOptionByValue(optionValue), [getOptionByValue]);
  const createHandleButtonClick = externalEventHandlers => event => {
    externalEventHandlers?.onClick?.(event);
    if (!event.defaultMuiPrevented) {
      const action = {
        type: SelectActionTypes.buttonClick,
        event
      };
      dispatch(action);
    }
  };
  const createHandleButtonKeyDown = otherHandlers => event => {
    otherHandlers.onKeyDown?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      dispatch({
        type: ListActionTypes.keyDown,
        key: event.key,
        event
      });
    }
  };
  const getButtonOwnRootProps = (otherHandlers = {}) => ({
    onClick: createHandleButtonClick(otherHandlers),
    onKeyDown: createHandleButtonKeyDown(otherHandlers)
  });
  const getSelectTriggerProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, getButtonOwnRootProps(otherHandlers), {
      role: 'combobox',
      'aria-expanded': open,
      'aria-controls': listboxId
    });
  };
  const getButtonProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const combinedProps = combineHooksSlotProps(getSelectTriggerProps, getButtonRootProps);
    return _extends({}, externalProps, combinedProps(externalEventHandlers));
  };
  const createListboxHandleBlur = otherHandlers => event => {
    otherHandlers.onBlur?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (listboxRef.current?.contains(event.relatedTarget) || event.relatedTarget === buttonRef.current) {
      event.defaultMuiPrevented = true;
    }
  };
  const getOwnListboxHandlers = (otherHandlers = {}) => ({
    onBlur: createListboxHandleBlur(otherHandlers)
  });
  const getListboxProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListboxRootProps);
    return _extends({
      id: listboxId,
      role: 'listbox',
      'aria-multiselectable': multiple ? 'true' : undefined
    }, externalProps, getCombinedRootProps(externalEventHandlers));
  };
  React.useDebugValue({
    selectedOptions,
    highlightedOption,
    open
  });
  const contextValue = React.useMemo(() => _extends({}, listContextValue, compoundComponentContextValue), [listContextValue, compoundComponentContextValue]);
  let selectValue;
  if (props.multiple) {
    selectValue = selectedOptions;
  } else {
    selectValue = selectedOptions.length > 0 ? selectedOptions[0] : null;
  }
  let selectedOptionsMetadata;
  if (multiple) {
    selectedOptionsMetadata = selectValue.map(v => getOptionMetadata(v)).filter(o => o !== undefined);
  } else {
    selectedOptionsMetadata = getOptionMetadata(selectValue) ?? null;
  }
  const createHandleHiddenInputChange = externalEventHandlers => event => {
    externalEventHandlers?.onChange?.(event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const option = options.get(event.target.value);

    // support autofill
    if (event.target.value === '') {
      dispatch({
        type: ListActionTypes.clearSelection
      });
    } else if (option !== undefined) {
      dispatch({
        type: SelectActionTypes.browserAutoFill,
        item: option.value,
        event
      });
    }
  };
  const getHiddenInputProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return _extends({
      name,
      tabIndex: -1,
      'aria-hidden': true,
      required: required ? true : undefined,
      value: getSerializedValue(selectedOptionsMetadata),
      style: visuallyHiddenStyle
    }, externalProps, {
      onChange: createHandleHiddenInputChange(externalEventHandlers)
    });
  };
  return {
    buttonActive,
    buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getHiddenInputProps,
    getListboxProps,
    getOptionMetadata,
    listboxRef: mergedListRootRef,
    open,
    options: optionValues,
    value: selectValue,
    highlightedOption
  };
}
export { useSelect };