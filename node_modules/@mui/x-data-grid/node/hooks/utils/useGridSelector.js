"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridSelector = exports.objectShallowCompare = void 0;
var React = _interopRequireWildcard(require("react"));
var _useLazyRef = require("./useLazyRef");
var _useOnMount = require("./useOnMount");
var _warning = require("../../utils/warning");
var _fastObjectShallowCompare = require("../../utils/fastObjectShallowCompare");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const stateNotInitializedWarning = (0, _warning.buildWarning)(['MUI X: `useGridSelector` has been called before the initialization of the state.', 'This hook can only be used inside the context of the grid.']);
function isOutputSelector(selector) {
  return selector.acceptsApiRef;
}
function applySelector(apiRef, selector) {
  if (isOutputSelector(selector)) {
    return selector(apiRef);
  }
  return selector(apiRef.current.state);
}
const defaultCompare = Object.is;
const objectShallowCompare = exports.objectShallowCompare = _fastObjectShallowCompare.fastObjectShallowCompare;
const createRefs = () => ({
  state: null,
  equals: null,
  selector: null
});
const useGridSelector = (apiRef, selector, equals = defaultCompare) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!apiRef.current.state) {
      stateNotInitializedWarning();
    }
  }
  const refs = (0, _useLazyRef.useLazyRef)(createRefs);
  const didInit = refs.current.selector !== null;
  const [state, setState] = React.useState(
  // We don't use an initialization function to avoid allocations
  didInit ? null : applySelector(apiRef, selector));
  refs.current.state = state;
  refs.current.equals = equals;
  refs.current.selector = selector;
  (0, _useOnMount.useOnMount)(() => {
    return apiRef.current.store.subscribe(() => {
      const newState = applySelector(apiRef, refs.current.selector);
      if (!refs.current.equals(refs.current.state, newState)) {
        refs.current.state = newState;
        setState(newState);
      }
    });
  });
  return state;
};
exports.useGridSelector = useGridSelector;