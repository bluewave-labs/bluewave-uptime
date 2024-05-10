"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function () {
    return _capitalize.default;
  }
});
Object.defineProperty(exports, "createChainedFunction", {
  enumerable: true,
  get: function () {
    return _createChainedFunction.default;
  }
});
Object.defineProperty(exports, "createSvgIcon", {
  enumerable: true,
  get: function () {
    return _createSvgIcon.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "deprecatedPropType", {
  enumerable: true,
  get: function () {
    return _deprecatedPropType.default;
  }
});
Object.defineProperty(exports, "isMuiElement", {
  enumerable: true,
  get: function () {
    return _isMuiElement.default;
  }
});
Object.defineProperty(exports, "ownerDocument", {
  enumerable: true,
  get: function () {
    return _ownerDocument.default;
  }
});
Object.defineProperty(exports, "ownerWindow", {
  enumerable: true,
  get: function () {
    return _ownerWindow.default;
  }
});
Object.defineProperty(exports, "requirePropFactory", {
  enumerable: true,
  get: function () {
    return _requirePropFactory.default;
  }
});
Object.defineProperty(exports, "setRef", {
  enumerable: true,
  get: function () {
    return _setRef.default;
  }
});
exports.unstable_ClassNameGenerator = void 0;
Object.defineProperty(exports, "unstable_useEnhancedEffect", {
  enumerable: true,
  get: function () {
    return _useEnhancedEffect.default;
  }
});
Object.defineProperty(exports, "unstable_useId", {
  enumerable: true,
  get: function () {
    return _useId.default;
  }
});
Object.defineProperty(exports, "unsupportedProp", {
  enumerable: true,
  get: function () {
    return _unsupportedProp.default;
  }
});
Object.defineProperty(exports, "useControlled", {
  enumerable: true,
  get: function () {
    return _useControlled.default;
  }
});
Object.defineProperty(exports, "useEventCallback", {
  enumerable: true,
  get: function () {
    return _useEventCallback.default;
  }
});
Object.defineProperty(exports, "useForkRef", {
  enumerable: true,
  get: function () {
    return _useForkRef.default;
  }
});
Object.defineProperty(exports, "useIsFocusVisible", {
  enumerable: true,
  get: function () {
    return _useIsFocusVisible.default;
  }
});
var _ClassNameGenerator = require("@mui/base/ClassNameGenerator");
var _capitalize = _interopRequireDefault(require("./capitalize"));
var _createChainedFunction = _interopRequireDefault(require("./createChainedFunction"));
var _createSvgIcon = _interopRequireDefault(require("./createSvgIcon"));
var _debounce = _interopRequireDefault(require("./debounce"));
var _deprecatedPropType = _interopRequireDefault(require("./deprecatedPropType"));
var _isMuiElement = _interopRequireDefault(require("./isMuiElement"));
var _ownerDocument = _interopRequireDefault(require("./ownerDocument"));
var _ownerWindow = _interopRequireDefault(require("./ownerWindow"));
var _requirePropFactory = _interopRequireDefault(require("./requirePropFactory"));
var _setRef = _interopRequireDefault(require("./setRef"));
var _useEnhancedEffect = _interopRequireDefault(require("./useEnhancedEffect"));
var _useId = _interopRequireDefault(require("./useId"));
var _unsupportedProp = _interopRequireDefault(require("./unsupportedProp"));
var _useControlled = _interopRequireDefault(require("./useControlled"));
var _useEventCallback = _interopRequireDefault(require("./useEventCallback"));
var _useForkRef = _interopRequireDefault(require("./useForkRef"));
var _useIsFocusVisible = _interopRequireDefault(require("./useIsFocusVisible"));
// TODO: remove this export once ClassNameGenerator is stable
// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_ClassNameGenerator = exports.unstable_ClassNameGenerator = {
  configure: generator => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(['MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.', '', "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", '', 'The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401', '', 'The updated documentation: https://mui.com/guides/classname-generator/'].join('\n'));
    }
    _ClassNameGenerator.unstable_ClassNameGenerator.configure(generator);
  }
};