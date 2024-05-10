import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["clearable", "onClear", "InputProps", "sx", "slots", "slotProps"],
  _excluded2 = ["ownerState"];
import * as React from 'react';
import { useSlotProps } from '@mui/base/utils';
import MuiIconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ClearIcon } from '../icons';
import { useLocaleText } from '../internals/hooks/useUtils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const useClearableField = props => {
  const localeText = useLocaleText();
  const {
      clearable,
      onClear,
      InputProps,
      sx,
      slots,
      slotProps
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const IconButton = slots?.clearButton ?? MuiIconButton;
  // The spread is here to avoid this bug mui/material-ui#34056
  const _useSlotProps = useSlotProps({
      elementType: IconButton,
      externalSlotProps: slotProps?.clearButton,
      ownerState: {},
      className: 'clearButton',
      additionalProps: {
        title: localeText.fieldClearLabel
      }
    }),
    iconButtonProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded2);
  const EndClearIcon = slots?.clearIcon ?? ClearIcon;
  const endClearIconProps = useSlotProps({
    elementType: EndClearIcon,
    externalSlotProps: slotProps?.clearIcon,
    ownerState: {}
  });
  return _extends({}, other, {
    InputProps: _extends({}, InputProps, {
      endAdornment: /*#__PURE__*/_jsxs(React.Fragment, {
        children: [clearable && /*#__PURE__*/_jsx(InputAdornment, {
          position: "end",
          sx: {
            marginRight: InputProps?.endAdornment ? -1 : -1.5
          },
          children: /*#__PURE__*/_jsx(IconButton, _extends({}, iconButtonProps, {
            onClick: onClear,
            children: /*#__PURE__*/_jsx(EndClearIcon, _extends({
              fontSize: "small"
            }, endClearIconProps))
          }))
        }), InputProps?.endAdornment]
      })
    }),
    sx: [{
      '& .clearButton': {
        opacity: 1
      },
      '@media (pointer: fine)': {
        '& .clearButton': {
          opacity: 0
        },
        '&:hover, &:focus-within': {
          '.clearButton': {
            opacity: 1
          }
        }
      }
    }, ...(Array.isArray(sx) ? sx : [sx])]
  });
};