"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFieldV6TextField = exports.addPositionPropertiesToSections = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _utils = require("../../utils/utils");
var _useField = require("./useField.utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const cleanString = dirtyString => dirtyString.replace(/[\u2066\u2067\u2068\u2069]/g, '');
const addPositionPropertiesToSections = (sections, localizedDigits, isRTL) => {
  let position = 0;
  let positionInInput = isRTL ? 1 : 0;
  const newSections = [];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const renderedValue = (0, _useField.getSectionVisibleValue)(section, isRTL ? 'input-rtl' : 'input-ltr', localizedDigits);
    const sectionStr = `${section.startSeparator}${renderedValue}${section.endSeparator}`;
    const sectionLength = cleanString(sectionStr).length;
    const sectionLengthInInput = sectionStr.length;

    // The ...InInput values consider the unicode characters but do include them in their indexes
    const cleanedValue = cleanString(renderedValue);
    const startInInput = positionInInput + (cleanedValue === '' ? 0 : renderedValue.indexOf(cleanedValue[0])) + section.startSeparator.length;
    const endInInput = startInInput + cleanedValue.length;
    newSections.push((0, _extends2.default)({}, section, {
      start: position,
      end: position + sectionLength,
      startInInput,
      endInInput
    }));
    position += sectionLength;
    // Move position to the end of string associated to the current section
    positionInInput += sectionLengthInInput;
  }
  return newSections;
};
exports.addPositionPropertiesToSections = addPositionPropertiesToSections;
const useFieldV6TextField = params => {
  const theme = (0, _styles.useTheme)();
  const isRTL = theme.direction === 'rtl';
  const focusTimeoutRef = React.useRef();
  const {
    forwardedProps: {
      onFocus,
      onClick,
      onPaste,
      onBlur,
      inputRef: inputRefProp,
      placeholder: inPlaceholder
    },
    internalProps: {
      readOnly = false
    },
    parsedSelectedSections,
    activeSectionIndex,
    state,
    fieldValueManager,
    valueManager,
    applyCharacterEditing,
    resetCharacterQuery,
    updateSectionValue,
    updateValueFromValueStr,
    clearActiveSection,
    clearValue,
    setTempAndroidValueStr,
    setSelectedSections,
    getSectionsFromValue,
    areAllSectionsEmpty,
    localizedDigits
  } = params;
  const inputRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(inputRefProp, inputRef);
  const sections = React.useMemo(() => addPositionPropertiesToSections(state.sections, localizedDigits, isRTL), [state.sections, localizedDigits, isRTL]);
  const interactions = React.useMemo(() => ({
    syncSelectionToDOM: () => {
      if (!inputRef.current) {
        return;
      }
      if (parsedSelectedSections == null) {
        if (inputRef.current.scrollLeft) {
          // Ensure that input content is not marked as selected.
          // setting selection range to 0 causes issues in Safari.
          // https://bugs.webkit.org/show_bug.cgi?id=224425
          inputRef.current.scrollLeft = 0;
        }
        return;
      }

      // On multi input range pickers we want to update selection range only for the active input
      // This helps to avoid the focus jumping on Safari https://github.com/mui/mui-x/issues/9003
      // because WebKit implements the `setSelectionRange` based on the spec: https://bugs.webkit.org/show_bug.cgi?id=224425
      if (inputRef.current !== (0, _utils.getActiveElement)(document)) {
        return;
      }

      // Fix scroll jumping on iOS browser: https://github.com/mui/mui-x/issues/8321
      const currentScrollTop = inputRef.current.scrollTop;
      if (parsedSelectedSections === 'all') {
        inputRef.current.select();
      } else {
        const selectedSection = sections[parsedSelectedSections];
        const selectionStart = selectedSection.type === 'empty' ? selectedSection.startInInput - selectedSection.startSeparator.length : selectedSection.startInInput;
        const selectionEnd = selectedSection.type === 'empty' ? selectedSection.endInInput + selectedSection.endSeparator.length : selectedSection.endInInput;
        if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
          if (inputRef.current === (0, _utils.getActiveElement)(document)) {
            inputRef.current.setSelectionRange(selectionStart, selectionEnd);
          }
        }
      }

      // Even reading this variable seems to do the trick, but also setting it just to make use of it
      inputRef.current.scrollTop = currentScrollTop;
    },
    getActiveSectionIndexFromDOM: () => {
      const browserStartIndex = inputRef.current.selectionStart ?? 0;
      const browserEndIndex = inputRef.current.selectionEnd ?? 0;
      const isInputReadOnly = !!inputRef.current?.readOnly;
      if (browserStartIndex === 0 && browserEndIndex === 0 || isInputReadOnly) {
        return null;
      }
      const nextSectionIndex = browserStartIndex <= sections[0].startInInput ? 1 // Special case if browser index is in invisible characters at the beginning.
      : sections.findIndex(section => section.startInInput - section.startSeparator.length > browserStartIndex);
      return nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1;
    },
    focusField: (newSelectedSection = 0) => {
      inputRef.current?.focus();
      setSelectedSections(newSelectedSection);
    },
    setSelectedSections: newSelectedSections => setSelectedSections(newSelectedSections),
    isFieldFocused: () => inputRef.current === (0, _utils.getActiveElement)(document)
  }), [inputRef, parsedSelectedSections, sections, setSelectedSections]);
  const syncSelectionFromDOM = () => {
    if (readOnly) {
      setSelectedSections(null);
      return;
    }
    const browserStartIndex = inputRef.current.selectionStart ?? 0;
    let nextSectionIndex;
    if (browserStartIndex <= sections[0].startInInput) {
      // Special case if browser index is in invisible characters at the beginning
      nextSectionIndex = 1;
    } else if (browserStartIndex >= sections[sections.length - 1].endInInput) {
      // If the click is after the last character of the input, then we want to select the 1st section.
      nextSectionIndex = 1;
    } else {
      nextSectionIndex = sections.findIndex(section => section.startInInput - section.startSeparator.length > browserStartIndex);
    }
    const sectionIndex = nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1;
    setSelectedSections(sectionIndex);
  };
  const handleInputFocus = (0, _useEventCallback.default)((...args) => {
    onFocus?.(...args);
    // The ref is guaranteed to be resolved at this point.
    const input = inputRef.current;
    clearTimeout(focusTimeoutRef.current);
    focusTimeoutRef.current = setTimeout(() => {
      // The ref changed, the component got remounted, the focus event is no longer relevant.
      if (!input || input !== inputRef.current) {
        return;
      }
      if (activeSectionIndex != null || readOnly) {
        return;
      }
      if (
      // avoid selecting all sections when focusing empty field without value
      input.value.length && Number(input.selectionEnd) - Number(input.selectionStart) === input.value.length) {
        setSelectedSections('all');
      } else {
        syncSelectionFromDOM();
      }
    });
  });
  const handleInputClick = (0, _useEventCallback.default)((event, ...args) => {
    // The click event on the clear button would propagate to the input, trigger this handler and result in a wrong section selection.
    // We avoid this by checking if the call of `handleInputClick` is actually intended, or a side effect.
    if (event.isDefaultPrevented()) {
      return;
    }
    onClick?.(event, ...args);
    syncSelectionFromDOM();
  });
  const handleInputPaste = (0, _useEventCallback.default)(event => {
    onPaste?.(event);

    // prevent default to avoid the input `onChange` handler being called
    event.preventDefault();
    if (readOnly) {
      return;
    }
    const pastedValue = event.clipboardData.getData('text');
    if (typeof parsedSelectedSections === 'number') {
      const activeSection = state.sections[parsedSelectedSections];
      const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
      const digitsOnly = /^[0-9]+$/.test(pastedValue);
      const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
      const isValidPastedValue = activeSection.contentType === 'letter' && lettersOnly || activeSection.contentType === 'digit' && digitsOnly || activeSection.contentType === 'digit-with-letter' && digitsAndLetterOnly;
      if (isValidPastedValue) {
        resetCharacterQuery();
        updateSectionValue({
          activeSection,
          newSectionValue: pastedValue,
          shouldGoToNextSection: true
        });
        return;
      }
      if (lettersOnly || digitsOnly) {
        // The pasted value corresponds to a single section, but not the expected type,
        // skip the modification
        return;
      }
    }
    resetCharacterQuery();
    updateValueFromValueStr(pastedValue);
  });
  const handleContainerBlur = (0, _useEventCallback.default)((...args) => {
    onBlur?.(...args);
    setSelectedSections(null);
  });
  const handleInputChange = (0, _useEventCallback.default)(event => {
    if (readOnly) {
      return;
    }
    const targetValue = event.target.value;
    if (targetValue === '') {
      resetCharacterQuery();
      clearValue();
      return;
    }
    const eventData = event.nativeEvent.data;
    // Calling `.fill(04/11/2022)` in playwright will trigger a change event with the requested content to insert in `event.nativeEvent.data`
    // usual changes have only the currently typed character in the `event.nativeEvent.data`
    const shouldUseEventData = eventData && eventData.length > 1;
    const valueStr = shouldUseEventData ? eventData : targetValue;
    const cleanValueStr = cleanString(valueStr);

    // If no section is selected or eventData should be used, we just try to parse the new value
    // This line is mostly triggered by imperative code / application tests.
    if (activeSectionIndex == null || shouldUseEventData) {
      updateValueFromValueStr(shouldUseEventData ? eventData : cleanValueStr);
      return;
    }
    let keyPressed;
    if (parsedSelectedSections === 'all' && cleanValueStr.length === 1) {
      keyPressed = cleanValueStr;
    } else {
      const prevValueStr = cleanString(fieldValueManager.getV6InputValueFromSections(sections, localizedDigits, isRTL));
      let startOfDiffIndex = -1;
      let endOfDiffIndex = -1;
      for (let i = 0; i < prevValueStr.length; i += 1) {
        if (startOfDiffIndex === -1 && prevValueStr[i] !== cleanValueStr[i]) {
          startOfDiffIndex = i;
        }
        if (endOfDiffIndex === -1 && prevValueStr[prevValueStr.length - i - 1] !== cleanValueStr[cleanValueStr.length - i - 1]) {
          endOfDiffIndex = i;
        }
      }
      const activeSection = sections[activeSectionIndex];
      const hasDiffOutsideOfActiveSection = startOfDiffIndex < activeSection.start || prevValueStr.length - endOfDiffIndex - 1 > activeSection.end;
      if (hasDiffOutsideOfActiveSection) {
        // TODO: Support if the new date is valid
        return;
      }

      // The active section being selected, the browser has replaced its value with the key pressed by the user.
      const activeSectionEndRelativeToNewValue = cleanValueStr.length - prevValueStr.length + activeSection.end - cleanString(activeSection.endSeparator || '').length;
      keyPressed = cleanValueStr.slice(activeSection.start + cleanString(activeSection.startSeparator || '').length, activeSectionEndRelativeToNewValue);
    }
    if (keyPressed.length === 0) {
      if ((0, _useField.isAndroid)()) {
        setTempAndroidValueStr(valueStr);
      } else {
        resetCharacterQuery();
        clearActiveSection();
      }
      return;
    }
    applyCharacterEditing({
      keyPressed,
      sectionIndex: activeSectionIndex
    });
  });
  const placeholder = React.useMemo(() => {
    if (inPlaceholder) {
      return inPlaceholder;
    }
    return fieldValueManager.getV6InputValueFromSections(getSectionsFromValue(valueManager.emptyValue), localizedDigits, isRTL);
  }, [inPlaceholder, fieldValueManager, getSectionsFromValue, valueManager.emptyValue, localizedDigits, isRTL]);
  const valueStr = React.useMemo(() => state.tempValueStrAndroid ?? fieldValueManager.getV6InputValueFromSections(state.sections, localizedDigits, isRTL), [state.sections, fieldValueManager, state.tempValueStrAndroid, localizedDigits, isRTL]);
  React.useEffect(() => {
    // Select all the sections when focused on mount (`autoFocus = true` on the input)
    if (inputRef.current && inputRef.current === (0, _utils.getActiveElement)(document)) {
      setSelectedSections('all');
    }
    return () => {
      clearTimeout(focusTimeoutRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inputMode = React.useMemo(() => {
    if (activeSectionIndex == null) {
      return 'text';
    }
    if (state.sections[activeSectionIndex].contentType === 'letter') {
      return 'text';
    }
    return 'numeric';
  }, [activeSectionIndex, state.sections]);
  const inputHasFocus = inputRef.current && inputRef.current === (0, _utils.getActiveElement)(document);
  const shouldShowPlaceholder = !inputHasFocus && areAllSectionsEmpty;
  return {
    interactions,
    returnedValue: {
      // Forwarded
      readOnly,
      onBlur: handleContainerBlur,
      onClick: handleInputClick,
      onFocus: handleInputFocus,
      onPaste: handleInputPaste,
      inputRef: handleRef,
      // Additional
      enableAccessibleFieldDOMStructure: false,
      placeholder,
      inputMode,
      autoComplete: 'off',
      value: shouldShowPlaceholder ? '' : valueStr,
      onChange: handleInputChange
    }
  };
};
exports.useFieldV6TextField = useFieldV6TextField;