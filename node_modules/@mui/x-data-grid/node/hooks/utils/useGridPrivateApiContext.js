"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPrivateApiContext = void 0;
exports.useGridPrivateApiContext = useGridPrivateApiContext;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridPrivateApiContext = exports.GridPrivateApiContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== 'production') {
  GridPrivateApiContext.displayName = 'GridPrivateApiContext';
}
function useGridPrivateApiContext() {
  const privateApiRef = React.useContext(GridPrivateApiContext);
  if (privateApiRef === undefined) {
    throw new Error(['MUI X: Could not find the data grid private context.', 'It looks like you rendered your component outside of a DataGrid, DataGridPro or DataGridPremium parent component.', 'This can also happen if you are bundling multiple versions of the data grid.'].join('\n'));
  }
  return privateApiRef;
}