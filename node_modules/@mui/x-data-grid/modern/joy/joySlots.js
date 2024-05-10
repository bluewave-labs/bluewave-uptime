import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["touchRippleRef", "inputProps", "onChange", "color", "size", "checked", "sx", "value", "inputRef"],
  _excluded2 = ["onChange", "label", "placeholder", "value", "inputRef", "type", "size", "variant"],
  _excluded3 = ["startIcon", "color", "endIcon", "size", "sx", "variant"],
  _excluded4 = ["color", "size", "sx", "touchRippleRef"],
  _excluded5 = ["open", "onOpen", "value", "onChange", "size", "color", "variant", "inputProps", "MenuProps", "inputRef", "error", "native", "fullWidth", "labelId"],
  _excluded6 = ["native"],
  _excluded7 = ["shrink", "variant", "sx"];
import * as React from 'react';
import JoyCheckbox from '@mui/joy/Checkbox';
import JoyInput from '@mui/joy/Input';
import JoyFormControl from '@mui/joy/FormControl';
import JoyFormLabel from '@mui/joy/FormLabel';
import JoyButton from '@mui/joy/Button';
import JoyIconButton from '@mui/joy/IconButton';
import JoySelect from '@mui/joy/Select';
import JoyOption from '@mui/joy/Option';
import JoyBox from '@mui/joy/Box';
import JoyTypography from '@mui/joy/Typography';
import JoyCircularProgress from '@mui/joy/CircularProgress';
import JoyTooltip from '@mui/joy/Tooltip';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import joyIconSlots, { GridKeyboardArrowRight, GridKeyboardArrowLeft } from './icons';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridFilteredTopLevelRowCountSelector, gridPaginationModelSelector } from '../hooks';
import { GridOverlay } from '../components/containers/GridOverlay';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function convertColor(color) {
  if (color === 'secondary') {
    return 'primary';
  }
  if (color === 'error') {
    return 'danger';
  }
  if (color === 'default' || color === 'inherit') {
    return 'neutral';
  }
  return color;
}
function convertSize(size) {
  return size ? {
    small: 'sm',
    medium: 'md',
    large: 'lg'
  }[size] : size;
}
function convertVariant(variant, defaultVariant = 'plain') {
  if (!variant) {
    return defaultVariant;
  }
  return {
    standard: 'outlined',
    outlined: 'outlined',
    contained: 'solid',
    text: 'plain',
    filled: 'soft'
  }[variant] || defaultVariant;
}
const Checkbox = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      inputProps,
      onChange,
      checked,
      inputRef
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_jsx(JoyCheckbox, _extends({}, props, {
    slotProps: {
      input: _extends({}, inputProps, {
        ref: inputRef
      })
    },
    ref: ref,
    checked: checked,
    onChange: onChange
  }));
});
const TextField = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  let {
      onChange,
      label,
      placeholder,
      value,
      inputRef,
      type,
      size,
      variant
    } = _ref2,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  const rootRef = useForkRef(ref, props.InputProps?.ref);
  const inputForkRef = useForkRef(inputRef, props?.inputProps?.ref);
  const {
    startAdornment,
    endAdornment
  } = props.InputProps || {};
  return /*#__PURE__*/_jsxs(JoyFormControl, {
    ref: rootRef,
    children: [/*#__PURE__*/_jsx(JoyFormLabel, {
      children: label
    }), /*#__PURE__*/_jsx(JoyInput, {
      type: type,
      value: value,
      onChange: onChange,
      placeholder: placeholder,
      variant: convertVariant(variant, 'outlined'),
      size: convertSize(size),
      slotProps: {
        input: _extends({}, props?.inputProps, {
          ref: inputForkRef
        })
      },
      startDecorator: startAdornment,
      endDecorator: endAdornment
    })]
  });
});
const Button = /*#__PURE__*/React.forwardRef(function Button(_ref3, ref) {
  let {
      startIcon,
      color,
      endIcon,
      size,
      sx,
      variant
    } = _ref3,
    props = _objectWithoutPropertiesLoose(_ref3, _excluded3);
  return /*#__PURE__*/_jsx(JoyButton, _extends({}, props, {
    size: convertSize(size),
    color: convertColor(color),
    variant: convertVariant(variant),
    ref: ref,
    startDecorator: startIcon,
    endDecorator: endIcon,
    sx: sx
  }));
});
const IconButton = /*#__PURE__*/React.forwardRef(function IconButton(_ref4, ref) {
  let {
      color,
      size,
      sx
    } = _ref4,
    props = _objectWithoutPropertiesLoose(_ref4, _excluded4);
  return /*#__PURE__*/_jsx(JoyIconButton, _extends({}, props, {
    size: convertSize(size),
    color: convertColor(color) ?? 'neutral',
    variant: "plain",
    ref: ref,
    sx: sx
  }));
});
const Select = /*#__PURE__*/React.forwardRef((_ref5, ref) => {
  let {
      open,
      onOpen,
      value,
      onChange,
      size,
      color,
      variant,
      MenuProps,
      inputRef,
      labelId
    } = _ref5,
    props = _objectWithoutPropertiesLoose(_ref5, _excluded5);
  const handleChange = (event, newValue) => {
    if (event && onChange) {
      // Same as in https://github.com/mui/material-ui/blob/e5558282a8f36856aef1299f3a36f3235e92e770/packages/mui-material/src/Select/SelectInput.js#L288-L300

      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      const nativeEvent = event.nativeEvent || event;
      // @ts-ignore The nativeEvent is function, not object
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: {
          value: newValue,
          name: props.name
        }
      });
      onChange(clonedEvent, null);
    }
  };
  return /*#__PURE__*/_jsx(JoySelect, _extends({}, props, {
    listboxOpen: open,
    onListboxOpenChange: isOpen => {
      if (isOpen) {
        onOpen?.({});
      } else {
        MenuProps?.onClose?.({}, undefined);
      }
    },
    size: convertSize(size),
    color: convertColor(color),
    variant: convertVariant(variant, 'outlined'),
    ref: ref,
    value: value,
    onChange: handleChange,
    slotProps: {
      button: {
        'aria-labelledby': labelId,
        ref: inputRef
      },
      listbox: {
        disablePortal: false,
        sx: {
          zIndex: 1350
        }
      }
    }
  }));
});
const Option = /*#__PURE__*/React.forwardRef((_ref6, ref) => {
  let props = _objectWithoutPropertiesLoose(_ref6, _excluded6);
  return /*#__PURE__*/_jsx(JoyOption, _extends({}, props, {
    ref: ref
  }));
});
const InputLabel = /*#__PURE__*/React.forwardRef((_ref7, ref) => {
  let {
      sx
    } = _ref7,
    props = _objectWithoutPropertiesLoose(_ref7, _excluded7);
  return /*#__PURE__*/_jsx(JoyFormLabel, _extends({}, props, {
    ref: ref,
    sx: sx
  }));
});
function labelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
const getLabelDisplayedRowsTo = ({
  page,
  pageSize,
  rowCount
}) => {
  if (rowCount === -1) {
    return (page + 1) * pageSize;
  }
  return pageSize === -1 ? rowCount : Math.min(rowCount, (page + 1) * pageSize);
};
const Pagination = /*#__PURE__*/React.forwardRef((props, ref) => {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const paginationModel = gridPaginationModelSelector(apiRef);
  const visibleTopLevelRowCount = gridFilteredTopLevelRowCountSelector(apiRef);
  const rowCount = React.useMemo(() => rootProps.rowCount ?? visibleTopLevelRowCount ?? 0, [rootProps.rowCount, visibleTopLevelRowCount]);
  const lastPage = React.useMemo(() => Math.floor(rowCount / (paginationModel.pageSize || 1)), [rowCount, paginationModel.pageSize]);
  const handlePageChange = React.useCallback(page => {
    apiRef.current.setPage(page);
  }, [apiRef]);
  const page = paginationModel.page <= lastPage ? paginationModel.page : lastPage;
  const pageSize = paginationModel.pageSize;
  const isPageSizeIncludedInPageSizeOptions = () => {
    for (let i = 0; i < rootProps.pageSizeOptions.length; i += 1) {
      const option = rootProps.pageSizeOptions[i];
      if (typeof option === 'number') {
        if (option === pageSize) {
          return true;
        }
      } else if (option.value === pageSize) {
        return true;
      }
    }
    return false;
  };
  const pageSizeOptions = isPageSizeIncludedInPageSizeOptions() ? rootProps.pageSizeOptions : [];
  const handleChangeRowsPerPage = (event, newValue) => {
    const newPageSize = Number(newValue);
    apiRef.current.setPageSize(newPageSize);
  };
  return /*#__PURE__*/_jsxs(JoyBox, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      justifyContent: 'flex-end',
      px: 2
    },
    ref: ref,
    children: [/*#__PURE__*/_jsxs(JoyFormControl, {
      orientation: "horizontal",
      size: "sm",
      children: [/*#__PURE__*/_jsx(JoyFormLabel, {
        children: "Rows per page:"
      }), /*#__PURE__*/_jsx(JoySelect, {
        onChange: handleChangeRowsPerPage,
        value: pageSize,
        children: pageSizeOptions.map(option => {
          return /*#__PURE__*/_jsx(Option, {
            value: typeof option !== 'number' && option.value ? option.value : option,
            children: typeof option !== 'number' && option.label ? option.label : `${option}`
          }, typeof option !== 'number' && option.label ? option.label : `${option}`);
        })
      })]
    }), /*#__PURE__*/_jsx(JoyTypography, {
      textAlign: "center",
      fontSize: "xs",
      fontWeight: "md",
      children: labelDisplayedRows({
        from: rowCount === 0 ? 0 : page * pageSize + 1,
        to: getLabelDisplayedRowsTo({
          page,
          pageSize,
          rowCount
        }),
        count: rowCount === -1 ? -1 : rowCount
      })
    }), /*#__PURE__*/_jsxs(JoyBox, {
      sx: {
        display: 'flex',
        gap: 0.5
      },
      children: [/*#__PURE__*/_jsx(JoyIconButton, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: page === 0,
        onClick: () => handlePageChange(page - 1),
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/_jsx(GridKeyboardArrowLeft, {})
      }), /*#__PURE__*/_jsx(JoyIconButton, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: rowCount !== -1 ? page >= Math.ceil(rowCount / pageSize) - 1 : false,
        onClick: () => handlePageChange(page + 1),
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/_jsx(GridKeyboardArrowRight, {})
      })]
    })]
  });
});
const LoadingOverlay = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/_jsx(GridOverlay, _extends({}, props, {
    ref: ref,
    children: /*#__PURE__*/_jsx(JoyCircularProgress, {})
  }));
});
const joySlots = _extends({}, joyIconSlots, {
  baseCheckbox: Checkbox,
  baseTextField: TextField,
  baseButton: Button,
  baseIconButton: IconButton,
  baseSelect: Select,
  baseSelectOption: Option,
  baseInputLabel: InputLabel,
  baseFormControl: JoyFormControl /* FIXME: typing error */,
  baseTooltip: JoyTooltip /* FIXME: typing error */,
  pagination: Pagination,
  loadingOverlay: LoadingOverlay
});
export default joySlots;