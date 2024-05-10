"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _Checkbox = _interopRequireDefault(require("@mui/joy/Checkbox"));
var _Input = _interopRequireDefault(require("@mui/joy/Input"));
var _FormControl = _interopRequireDefault(require("@mui/joy/FormControl"));
var _FormLabel = _interopRequireDefault(require("@mui/joy/FormLabel"));
var _Button = _interopRequireDefault(require("@mui/joy/Button"));
var _IconButton = _interopRequireDefault(require("@mui/joy/IconButton"));
var _Select = _interopRequireDefault(require("@mui/joy/Select"));
var _Option = _interopRequireDefault(require("@mui/joy/Option"));
var _Box = _interopRequireDefault(require("@mui/joy/Box"));
var _Typography = _interopRequireDefault(require("@mui/joy/Typography"));
var _CircularProgress = _interopRequireDefault(require("@mui/joy/CircularProgress"));
var _Tooltip = _interopRequireDefault(require("@mui/joy/Tooltip"));
var _utils = require("@mui/utils");
var _icons = _interopRequireWildcard(require("./icons"));
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _hooks = require("../hooks");
var _GridOverlay = require("../components/containers/GridOverlay");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["touchRippleRef", "inputProps", "onChange", "color", "size", "checked", "sx", "value", "inputRef"],
  _excluded2 = ["onChange", "label", "placeholder", "value", "inputRef", "type", "size", "variant"],
  _excluded3 = ["startIcon", "color", "endIcon", "size", "sx", "variant"],
  _excluded4 = ["color", "size", "sx", "touchRippleRef"],
  _excluded5 = ["open", "onOpen", "value", "onChange", "size", "color", "variant", "inputProps", "MenuProps", "inputRef", "error", "native", "fullWidth", "labelId"],
  _excluded6 = ["native"],
  _excluded7 = ["shrink", "variant", "sx"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Checkbox.default, (0, _extends2.default)({}, props, {
    slotProps: {
      input: (0, _extends2.default)({}, inputProps, {
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
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded2);
  const rootRef = (0, _utils.unstable_useForkRef)(ref, props.InputProps?.ref);
  const inputForkRef = (0, _utils.unstable_useForkRef)(inputRef, props?.inputProps?.ref);
  const {
    startAdornment,
    endAdornment
  } = props.InputProps || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FormControl.default, {
    ref: rootRef,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FormLabel.default, {
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {
      type: type,
      value: value,
      onChange: onChange,
      placeholder: placeholder,
      variant: convertVariant(variant, 'outlined'),
      size: convertSize(size),
      slotProps: {
        input: (0, _extends2.default)({}, props?.inputProps, {
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
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref3, _excluded3);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, (0, _extends2.default)({}, props, {
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
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref4, _excluded4);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, (0, _extends2.default)({}, props, {
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
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref5, _excluded5);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, (0, _extends2.default)({}, props, {
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
  let props = (0, _objectWithoutPropertiesLoose2.default)(_ref6, _excluded6);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Option.default, (0, _extends2.default)({}, props, {
    ref: ref
  }));
});
const InputLabel = /*#__PURE__*/React.forwardRef((_ref7, ref) => {
  let {
      sx
    } = _ref7,
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref7, _excluded7);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormLabel.default, (0, _extends2.default)({}, props, {
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
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const paginationModel = (0, _hooks.gridPaginationModelSelector)(apiRef);
  const visibleTopLevelRowCount = (0, _hooks.gridFilteredTopLevelRowCountSelector)(apiRef);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      justifyContent: 'flex-end',
      px: 2
    },
    ref: ref,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_FormControl.default, {
      orientation: "horizontal",
      size: "sm",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FormLabel.default, {
        children: "Rows per page:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
        onChange: handleChangeRowsPerPage,
        value: pageSize,
        children: pageSizeOptions.map(option => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(Option, {
            value: typeof option !== 'number' && option.value ? option.value : option,
            children: typeof option !== 'number' && option.label ? option.label : `${option}`
          }, typeof option !== 'number' && option.label ? option.label : `${option}`);
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
      sx: {
        display: 'flex',
        gap: 0.5
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: page === 0,
        onClick: () => handlePageChange(page - 1),
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.GridKeyboardArrowLeft, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
        size: "sm",
        color: "neutral",
        variant: "outlined",
        disabled: rowCount !== -1 ? page >= Math.ceil(rowCount / pageSize) - 1 : false,
        onClick: () => handlePageChange(page + 1),
        sx: {
          bgcolor: 'background.surface'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.GridKeyboardArrowRight, {})
      })]
    })]
  });
});
const LoadingOverlay = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridOverlay.GridOverlay, (0, _extends2.default)({}, props, {
    ref: ref,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {})
  }));
});
const joySlots = (0, _extends2.default)({}, _icons.default, {
  baseCheckbox: Checkbox,
  baseTextField: TextField,
  baseButton: Button,
  baseIconButton: IconButton,
  baseSelect: Select,
  baseSelectOption: Option,
  baseInputLabel: InputLabel,
  baseFormControl: _FormControl.default /* FIXME: typing error */,
  baseTooltip: _Tooltip.default /* FIXME: typing error */,
  pagination: Pagination,
  loadingOverlay: LoadingOverlay
});
var _default = exports.default = joySlots;