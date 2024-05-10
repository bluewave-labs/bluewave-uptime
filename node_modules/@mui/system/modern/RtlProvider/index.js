import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["value"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
const RtlContext = /*#__PURE__*/React.createContext();
function RtlProvider(_ref) {
  let {
      value
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_jsx(RtlContext.Provider, _extends({
    value: value ?? true
  }, props));
}
process.env.NODE_ENV !== "production" ? RtlProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.bool
} : void 0;
export const useRtl = () => {
  const value = React.useContext(RtlContext);
  return value ?? false;
};
export default RtlProvider;