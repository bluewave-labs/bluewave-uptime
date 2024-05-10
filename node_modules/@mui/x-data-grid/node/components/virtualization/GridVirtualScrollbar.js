"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridVirtualScrollbar = void 0;
var React = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _utils = require("@mui/utils");
var _useOnMount = require("../../hooks/utils/useOnMount");
var _useGridPrivateApiContext = require("../../hooks/utils/useGridPrivateApiContext");
var _hooks = require("../../hooks");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridClasses = require("../../constants/gridClasses");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = (ownerState, position) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['scrollbar', `scrollbar--${position}`],
    content: ['scrollbarContent']
  };
  return (0, _utils.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};
const Scrollbar = (0, _system.styled)('div')({
  position: 'absolute',
  display: 'inline-block',
  zIndex: 6,
  '& > div': {
    display: 'inline-block'
  },
  // In macOS Safari and Gnome Web, scrollbars are overlaid and don't affect the layout. So we consider
  // their size to be 0px throughout all the calculations, but the floating scrollbar container does need
  // to appear and have a real size. We set it to 14px because it seems like an acceptable value and we
  // don't have a method to find the required size for scrollbars on those platforms.
  '--size': 'calc(max(var(--DataGrid-scrollbarSize), 14px))'
});
const ScrollbarVertical = (0, _system.styled)(Scrollbar)({
  width: 'var(--size)',
  height: 'calc(var(--DataGrid-hasScrollY) * (100% - var(--DataGrid-topContainerHeight) - var(--DataGrid-bottomContainerHeight) - var(--DataGrid-hasScrollX) * var(--DataGrid-scrollbarSize)))',
  overflowY: 'auto',
  overflowX: 'hidden',
  // Disable focus-visible style, it's a scrollbar.
  outline: 0,
  '& > div': {
    width: 'var(--size)'
  },
  top: 'var(--DataGrid-topContainerHeight)',
  right: '0px'
});
const ScrollbarHorizontal = (0, _system.styled)(Scrollbar)({
  width: '100%',
  height: 'var(--size)',
  overflowY: 'hidden',
  overflowX: 'auto',
  // Disable focus-visible style, it's a scrollbar.
  outline: 0,
  '& > div': {
    height: 'var(--size)'
  },
  bottom: '0px'
});
const Content = (0, _system.styled)('div')({
  display: 'inline-block'
});
const GridVirtualScrollbar = exports.GridVirtualScrollbar = /*#__PURE__*/React.forwardRef(function GridVirtualScrollbar(props, ref) {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const isLocked = React.useRef(false);
  const lastPosition = React.useRef(0);
  const scrollbarRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const classes = useUtilityClasses(rootProps, props.position);
  const dimensions = (0, _hooks.useGridSelector)(apiRef, _hooks.gridDimensionsSelector);
  const propertyDimension = props.position === 'vertical' ? 'height' : 'width';
  const propertyScroll = props.position === 'vertical' ? 'scrollTop' : 'scrollLeft';
  const hasScroll = props.position === 'vertical' ? dimensions.hasScrollX : dimensions.hasScrollY;
  const contentSize = dimensions.minimumSize[propertyDimension] + (hasScroll ? dimensions.scrollbarSize : 0);
  const scrollbarSize = props.position === 'vertical' ? dimensions.viewportInnerSize.height : dimensions.viewportOuterSize.width;
  const scrollbarInnerSize = scrollbarSize * (contentSize / dimensions.viewportOuterSize[propertyDimension]);
  const onScrollerScroll = (0, _utils.unstable_useEventCallback)(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    if (scroller[propertyScroll] === lastPosition.current) {
      return;
    }
    if (isLocked.current) {
      isLocked.current = false;
      return;
    }
    isLocked.current = true;
    const value = scroller[propertyScroll] / contentSize;
    scrollbar[propertyScroll] = value * scrollbarInnerSize;
    lastPosition.current = scroller[propertyScroll];
  });
  const onScrollbarScroll = (0, _utils.unstable_useEventCallback)(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    if (isLocked.current) {
      isLocked.current = false;
      return;
    }
    isLocked.current = true;
    const value = scrollbar[propertyScroll] / scrollbarInnerSize;
    scroller[propertyScroll] = value * contentSize;
  });
  (0, _useOnMount.useOnMount)(() => {
    const scroller = apiRef.current.virtualScrollerRef.current;
    const scrollbar = scrollbarRef.current;
    scroller.addEventListener('scroll', onScrollerScroll, {
      capture: true
    });
    scrollbar.addEventListener('scroll', onScrollbarScroll, {
      capture: true
    });
    return () => {
      scroller.removeEventListener('scroll', onScrollerScroll, {
        capture: true
      });
      scrollbar.removeEventListener('scroll', onScrollbarScroll, {
        capture: true
      });
    };
  });
  React.useEffect(() => {
    const content = contentRef.current;
    content.style.setProperty(propertyDimension, `${scrollbarInnerSize}px`);
  }, [scrollbarInnerSize, propertyDimension]);
  const Container = props.position === 'vertical' ? ScrollbarVertical : ScrollbarHorizontal;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Container, {
    ref: (0, _utils.unstable_useForkRef)(ref, scrollbarRef),
    className: classes.root,
    tabIndex: -1,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Content, {
      ref: contentRef,
      className: classes.content
    })
  });
});