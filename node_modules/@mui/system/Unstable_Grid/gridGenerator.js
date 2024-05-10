"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSpacingClassNames = exports.generateSizeClassNames = exports.generateGridStyles = exports.generateGridSizeStyles = exports.generateGridRowSpacingStyles = exports.generateGridOffsetStyles = exports.generateGridDirectionStyles = exports.generateGridColumnsStyles = exports.generateGridColumnSpacingStyles = exports.generateDirectionClasses = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _traverseBreakpoints = require("./traverseBreakpoints");
function appendLevel(level) {
  if (!level) {
    return '';
  }
  return `Level${level}`;
}
function isNestedContainer(ownerState) {
  return ownerState.unstable_level > 0 && ownerState.container;
}
function createGetSelfSpacing(ownerState) {
  return function getSelfSpacing(axis) {
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level)})`;
  };
}
function createGetParentSpacing(ownerState) {
  return function getParentSpacing(axis) {
    if (ownerState.unstable_level === 0) {
      return `var(--Grid-${axis}Spacing)`;
    }
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level - 1)})`;
  };
}
function getParentColumns(ownerState) {
  if (ownerState.unstable_level === 0) {
    return `var(--Grid-columns)`;
  }
  return `var(--Grid-columns${appendLevel(ownerState.unstable_level - 1)})`;
}
const generateGridSizeStyles = ({
  theme,
  ownerState
}) => {
  const getSelfSpacing = createGetSelfSpacing(ownerState);
  const styles = {};
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.gridSize, (appendStyle, value) => {
    let style = {};
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
        width: `calc(100% * ${value} / ${getParentColumns(ownerState)}${isNestedContainer(ownerState) ? ` + ${getSelfSpacing('column')}` : ''})`
      };
    }
    appendStyle(styles, style);
  });
  return styles;
};
exports.generateGridSizeStyles = generateGridSizeStyles;
const generateGridOffsetStyles = ({
  theme,
  ownerState
}) => {
  const styles = {};
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.gridOffset, (appendStyle, value) => {
    let style = {};
    if (value === 'auto') {
      style = {
        marginLeft: 'auto'
      };
    }
    if (typeof value === 'number') {
      style = {
        marginLeft: value === 0 ? '0px' : `calc(100% * ${value} / ${getParentColumns(ownerState)})`
      };
    }
    appendStyle(styles, style);
  });
  return styles;
};
exports.generateGridOffsetStyles = generateGridOffsetStyles;
const generateGridColumnsStyles = ({
  theme,
  ownerState
}) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = isNestedContainer(ownerState) ? {
    [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: getParentColumns(ownerState)
  } : {
    '--Grid-columns': 12
  };
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
    appendStyle(styles, {
      [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: value
    });
  });
  return styles;
};
exports.generateGridColumnsStyles = generateGridColumnsStyles;
const generateGridRowSpacingStyles = ({
  theme,
  ownerState
}) => {
  if (!ownerState.container) {
    return {};
  }
  const getParentSpacing = createGetParentSpacing(ownerState);
  const styles = isNestedContainer(ownerState) ? {
    // Set the default spacing as its parent spacing.
    // It will be overridden if spacing props are provided
    [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing('row')
  } : {};
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.rowSpacing, (appendStyle, value) => {
    var _theme$spacing;
    appendStyle(styles, {
      [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === 'string' ? value : (_theme$spacing = theme.spacing) == null ? void 0 : _theme$spacing.call(theme, value)
    });
  });
  return styles;
};
exports.generateGridRowSpacingStyles = generateGridRowSpacingStyles;
const generateGridColumnSpacingStyles = ({
  theme,
  ownerState
}) => {
  if (!ownerState.container) {
    return {};
  }
  const getParentSpacing = createGetParentSpacing(ownerState);
  const styles = isNestedContainer(ownerState) ? {
    // Set the default spacing as its parent spacing.
    // It will be overridden if spacing props are provided
    [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing('column')
  } : {};
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.columnSpacing, (appendStyle, value) => {
    var _theme$spacing2;
    appendStyle(styles, {
      [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === 'string' ? value : (_theme$spacing2 = theme.spacing) == null ? void 0 : _theme$spacing2.call(theme, value)
    });
  });
  return styles;
};
exports.generateGridColumnSpacingStyles = generateGridColumnSpacingStyles;
const generateGridDirectionStyles = ({
  theme,
  ownerState
}) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  (0, _traverseBreakpoints.traverseBreakpoints)(theme.breakpoints, ownerState.direction, (appendStyle, value) => {
    appendStyle(styles, {
      flexDirection: value
    });
  });
  return styles;
};
exports.generateGridDirectionStyles = generateGridDirectionStyles;
const generateGridStyles = ({
  ownerState
}) => {
  const getSelfSpacing = createGetSelfSpacing(ownerState);
  const getParentSpacing = createGetParentSpacing(ownerState);
  return (0, _extends2.default)({
    minWidth: 0,
    boxSizing: 'border-box'
  }, ownerState.container && (0, _extends2.default)({
    display: 'flex',
    flexWrap: 'wrap'
  }, ownerState.wrap && ownerState.wrap !== 'wrap' && {
    flexWrap: ownerState.wrap
  }, {
    margin: `calc(${getSelfSpacing('row')} / -2) calc(${getSelfSpacing('column')} / -2)`
  }, ownerState.disableEqualOverflow && {
    margin: `calc(${getSelfSpacing('row')} * -1) 0px 0px calc(${getSelfSpacing('column')} * -1)`
  }), (!ownerState.container || isNestedContainer(ownerState)) && (0, _extends2.default)({
    padding: `calc(${getParentSpacing('row')} / 2) calc(${getParentSpacing('column')} / 2)`
  }, (ownerState.disableEqualOverflow || ownerState.parentDisableEqualOverflow) && {
    padding: `${getParentSpacing('row')} 0px 0px ${getParentSpacing('column')}`
  }));
};
exports.generateGridStyles = generateGridStyles;
const generateSizeClassNames = gridSize => {
  const classNames = [];
  Object.entries(gridSize).forEach(([key, value]) => {
    if (value !== false && value !== undefined) {
      classNames.push(`grid-${key}-${String(value)}`);
    }
  });
  return classNames;
};
exports.generateSizeClassNames = generateSizeClassNames;
const generateSpacingClassNames = (spacing, smallestBreakpoint = 'xs') => {
  function isValidSpacing(val) {
    if (val === undefined) {
      return false;
    }
    return typeof val === 'string' && !Number.isNaN(Number(val)) || typeof val === 'number' && val > 0;
  }
  if (isValidSpacing(spacing)) {
    return [`spacing-${smallestBreakpoint}-${String(spacing)}`];
  }
  if (typeof spacing === 'object' && !Array.isArray(spacing)) {
    const classNames = [];
    Object.entries(spacing).forEach(([key, value]) => {
      if (isValidSpacing(value)) {
        classNames.push(`spacing-${key}-${String(value)}`);
      }
    });
    return classNames;
  }
  return [];
};
exports.generateSpacingClassNames = generateSpacingClassNames;
const generateDirectionClasses = direction => {
  if (direction === undefined) {
    return [];
  }
  if (typeof direction === 'object') {
    return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
  }
  return [`direction-xs-${String(direction)}`];
};
exports.generateDirectionClasses = generateDirectionClasses;