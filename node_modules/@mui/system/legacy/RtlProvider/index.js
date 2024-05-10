import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
var RtlContext = /*#__PURE__*/React.createContext();
function RtlProvider(_ref) {
  var value = _ref.value,
    props = _objectWithoutProperties(_ref, ["value"]);
  return /*#__PURE__*/_jsx(RtlContext.Provider, _extends({
    value: value != null ? value : true
  }, props));
}
process.env.NODE_ENV !== "production" ? RtlProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.bool
} : void 0;
export var useRtl = function useRtl() {
  var value = React.useContext(RtlContext);
  return value != null ? value : false;
};
export default RtlProvider;