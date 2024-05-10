import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { traverseBreakpoints } from './traverseBreakpoints';
function appendLevel(level) {
  if (!level) {
    return '';
  }
  return "Level".concat(level);
}
function isNestedContainer(ownerState) {
  return ownerState.unstable_level > 0 && ownerState.container;
}
function createGetSelfSpacing(ownerState) {
  return function getSelfSpacing(axis) {
    return "var(--Grid-".concat(axis, "Spacing").concat(appendLevel(ownerState.unstable_level), ")");
  };
}
function createGetParentSpacing(ownerState) {
  return function getParentSpacing(axis) {
    if (ownerState.unstable_level === 0) {
      return "var(--Grid-".concat(axis, "Spacing)");
    }
    return "var(--Grid-".concat(axis, "Spacing").concat(appendLevel(ownerState.unstable_level - 1), ")");
  };
}
function getParentColumns(ownerState) {
  if (ownerState.unstable_level === 0) {
    return "var(--Grid-columns)";
  }
  return "var(--Grid-columns".concat(appendLevel(ownerState.unstable_level - 1), ")");
}
export var generateGridSizeStyles = function generateGridSizeStyles(_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var getSelfSpacing = createGetSelfSpacing(ownerState);
  var styles = {};
  traverseBreakpoints(theme.breakpoints, ownerState.gridSize, function (appendStyle, value) {
    var style = {};
    if (value === true) {
      style = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%'
      };
    }
    if (value === 'auto') {
      style = {
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto'
      };
    }
    if (typeof value === 'number') {
      style = {
        flexGrow: 0,
        flexBasis: 'auto',
        width: "calc(100% * ".concat(value, " / ").concat(getParentColumns(ownerState)).concat(isNestedContainer(ownerState) ? " + ".concat(getSelfSpacing('column')) : '', ")")
      };
    }
    appendStyle(styles, style);
  });
  return styles;
};
export var generateGridOffsetStyles = function generateGridOffsetStyles(_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  var styles = {};
  traverseBreakpoints(theme.breakpoints, ownerState.gridOffset, function (appendStyle, value) {
    var style = {};
    if (value === 'auto') {
      style = {
        marginLeft: 'auto'
      };
    }
    if (typeof value === 'number') {
      style = {
        marginLeft: value === 0 ? '0px' : "calc(100% * ".concat(value, " / ").concat(getParentColumns(ownerState), ")")
      };
    }
    appendStyle(styles, style);
  });
  return styles;
};
export var generateGridColumnsStyles = function generateGridColumnsStyles(_ref3) {
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  if (!ownerState.container) {
    return {};
  }
  var styles = isNestedContainer(ownerState) ? _defineProperty({}, "--Grid-columns".concat(appendLevel(ownerState.unstable_level)), getParentColumns(ownerState)) : {
    '--Grid-columns': 12
  };
  traverseBreakpoints(theme.breakpoints, ownerState.columns, function (appendStyle, value) {
    appendStyle(styles, _defineProperty({}, "--Grid-columns".concat(appendLevel(ownerState.unstable_level)), value));
  });
  return styles;
};
export var generateGridRowSpacingStyles = function generateGridRowSpacingStyles(_ref5) {
  var theme = _ref5.theme,
    ownerState = _ref5.ownerState;
  if (!ownerState.container) {
    return {};
  }
  var getParentSpacing = createGetParentSpacing(ownerState);
  var styles = isNestedContainer(ownerState) ? _defineProperty({}, "--Grid-rowSpacing".concat(appendLevel(ownerState.unstable_level)), getParentSpacing('row')) : {};
  traverseBreakpoints(theme.breakpoints, ownerState.rowSpacing, function (appendStyle, value) {
    var _theme$spacing;
    appendStyle(styles, _defineProperty({}, "--Grid-rowSpacing".concat(appendLevel(ownerState.unstable_level)), typeof value === 'string' ? value : (_theme$spacing = theme.spacing) == null ? void 0 : _theme$spacing.call(theme, value)));
  });
  return styles;
};
export var generateGridColumnSpacingStyles = function generateGridColumnSpacingStyles(_ref7) {
  var theme = _ref7.theme,
    ownerState = _ref7.ownerState;
  if (!ownerState.container) {
    return {};
  }
  var getParentSpacing = createGetParentSpacing(ownerState);
  var styles = isNestedContainer(ownerState) ? _defineProperty({}, "--Grid-columnSpacing".concat(appendLevel(ownerState.unstable_level)), getParentSpacing('column')) : {};
  traverseBreakpoints(theme.breakpoints, ownerState.columnSpacing, function (appendStyle, value) {
    var _theme$spacing2;
    appendStyle(styles, _defineProperty({}, "--Grid-columnSpacing".concat(appendLevel(ownerState.unstable_level)), typeof value === 'string' ? value : (_theme$spacing2 = theme.spacing) == null ? void 0 : _theme$spacing2.call(theme, value)));
  });
  return styles;
};
export var generateGridDirectionStyles = function generateGridDirectionStyles(_ref9) {
  var theme = _ref9.theme,
    ownerState = _ref9.ownerState;
  if (!ownerState.container) {
    return {};
  }
  var styles = {};
  traverseBreakpoints(theme.breakpoints, ownerState.direction, function (appendStyle, value) {
    appendStyle(styles, {
      flexDirection: value
    });
  });
  return styles;
};
export var generateGridStyles = function generateGridStyles(_ref10) {
  var ownerState = _ref10.ownerState;
  var getSelfSpacing = createGetSelfSpacing(ownerState);
  var getParentSpacing = createGetParentSpacing(ownerState);
  return _extends({
    minWidth: 0,
    boxSizing: 'border-box'
  }, ownerState.container && _extends({
    display: 'flex',
    flexWrap: 'wrap'
  }, ownerState.wrap && ownerState.wrap !== 'wrap' && {
    flexWrap: ownerState.wrap
  }, {
    margin: "calc(".concat(getSelfSpacing('row'), " / -2) calc(").concat(getSelfSpacing('column'), " / -2)")
  }, ownerState.disableEqualOverflow && {
    margin: "calc(".concat(getSelfSpacing('row'), " * -1) 0px 0px calc(").concat(getSelfSpacing('column'), " * -1)")
  }), (!ownerState.container || isNestedContainer(ownerState)) && _extends({
    padding: "calc(".concat(getParentSpacing('row'), " / 2) calc(").concat(getParentSpacing('column'), " / 2)")
  }, (ownerState.disableEqualOverflow || ownerState.parentDisableEqualOverflow) && {
    padding: "".concat(getParentSpacing('row'), " 0px 0px ").concat(getParentSpacing('column'))
  }));
};
export var generateSizeClassNames = function generateSizeClassNames(gridSize) {
  var classNames = [];
  Object.entries(gridSize).forEach(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      key = _ref12[0],
      value = _ref12[1];
    if (value !== false && value !== undefined) {
      classNames.push("grid-".concat(key, "-").concat(String(value)));
    }
  });
  return classNames;
};
export var generateSpacingClassNames = function generateSpacingClassNames(spacing) {
  var smallestBreakpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'xs';
  function isValidSpacing(val) {
    if (val === undefined) {
      return false;
    }
    return typeof val === 'string' && !Number.isNaN(Number(val)) || typeof val === 'number' && val > 0;
  }
  if (isValidSpacing(spacing)) {
    return ["spacing-".concat(smallestBreakpoint, "-").concat(String(spacing))];
  }
  if (_typeof(spacing) === 'object' && !Array.isArray(spacing)) {
    var classNames = [];
    Object.entries(spacing).forEach(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
        key = _ref14[0],
        value = _ref14[1];
      if (isValidSpacing(value)) {
        classNames.push("spacing-".concat(key, "-").concat(String(value)));
      }
    });
    return classNames;
  }
  return [];
};
export var generateDirectionClasses = function generateDirectionClasses(direction) {
  if (direction === undefined) {
    return [];
  }
  if (_typeof(direction) === 'object') {
    return Object.entries(direction).map(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        key = _ref16[0],
        value = _ref16[1];
      return "direction-".concat(key, "-").concat(value);
    });
  }
  return ["direction-xs-".concat(String(direction))];
};