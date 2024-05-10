import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["enableAccessibleFieldDOMStructure"],
  _excluded2 = ["InputProps", "readOnly"],
  _excluded3 = ["onPaste", "onKeyDown", "inputMode", "readOnly", "InputProps", "inputProps", "inputRef"];
export const convertFieldResponseIntoMuiTextFieldProps = _ref => {
  let {
      enableAccessibleFieldDOMStructure
    } = _ref,
    fieldResponse = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (enableAccessibleFieldDOMStructure) {
    const {
        InputProps,
        readOnly
      } = fieldResponse,
      other = _objectWithoutPropertiesLoose(fieldResponse, _excluded2);
    return _extends({}, other, {
      InputProps: _extends({}, InputProps ?? {}, {
        readOnly
      })
    });
  }
  const {
      onPaste,
      onKeyDown,
      inputMode,
      readOnly,
      InputProps,
      inputProps,
      inputRef
    } = fieldResponse,
    other = _objectWithoutPropertiesLoose(fieldResponse, _excluded3);
  return _extends({}, other, {
    InputProps: _extends({}, InputProps ?? {}, {
      readOnly
    }),
    inputProps: _extends({}, inputProps ?? {}, {
      inputMode,
      onPaste,
      onKeyDown,
      ref: inputRef
    })
  });
};