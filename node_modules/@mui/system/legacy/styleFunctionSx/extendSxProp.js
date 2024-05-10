import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { isPlainObject } from '@mui/utils/deepmerge';
import defaultSxConfig from './defaultSxConfig';
var splitProps = function splitProps(props) {
  var _props$theme$unstable, _props$theme;
  var result = {
    systemProps: {},
    otherProps: {}
  };
  var config = (_props$theme$unstable = props == null || (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : defaultSxConfig;
  Object.keys(props).forEach(function (prop) {
    if (config[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
export default function extendSxProp(props) {
  var inSx = props.sx,
    other = _objectWithoutProperties(props, ["sx"]);
  var _splitProps = splitProps(other),
    systemProps = _splitProps.systemProps,
    otherProps = _splitProps.otherProps;
  var finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps].concat(_toConsumableArray(inSx));
  } else if (typeof inSx === 'function') {
    finalSx = function finalSx() {
      var result = inSx.apply(void 0, arguments);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }
  return _extends({}, otherProps, {
    sx: finalSx
  });
}