import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["classes", "columnMenuOpen", "colIndex", "height", "isResizing", "sortDirection", "hasFocus", "tabIndex", "separatorSide", "isDraggable", "headerComponent", "description", "elementId", "width", "columnMenuIconButton", "columnMenu", "columnTitleIconButtons", "headerClassName", "label", "resizable", "draggableContainerProps", "columnHeaderSeparatorProps", "style"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { GridColumnHeaderTitle } from './GridColumnHeaderTitle';
import { GridColumnHeaderSeparator } from './GridColumnHeaderSeparator';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GridGenericColumnHeaderItem = /*#__PURE__*/React.forwardRef(function GridGenericColumnHeaderItem(props, ref) {
  const {
      classes,
      columnMenuOpen,
      colIndex,
      height,
      isResizing,
      sortDirection,
      hasFocus,
      tabIndex,
      separatorSide,
      isDraggable,
      headerComponent,
      description,
      width,
      columnMenuIconButton = null,
      columnMenu = null,
      columnTitleIconButtons = null,
      headerClassName,
      label,
      resizable,
      draggableContainerProps,
      columnHeaderSeparatorProps,
      style
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const rootProps = useGridRootProps();
  const headerCellRef = React.useRef(null);
  const [showColumnMenuIcon, setShowColumnMenuIcon] = React.useState(columnMenuOpen);
  const handleRef = useForkRef(headerCellRef, ref);
  let ariaSort = 'none';
  if (sortDirection != null) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }
  React.useEffect(() => {
    if (!showColumnMenuIcon) {
      setShowColumnMenuIcon(columnMenuOpen);
    }
  }, [showColumnMenuIcon, columnMenuOpen]);
  React.useLayoutEffect(() => {
    const columnMenuState = apiRef.current.state.columnMenu;
    if (hasFocus && !columnMenuState.open) {
      const focusableElement = headerCellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusableElement || headerCellRef.current;
      elementToFocus?.focus();
      if (apiRef.current.columnHeadersContainerRef?.current) {
        apiRef.current.columnHeadersContainerRef.current.scrollLeft = 0;
      }
    }
  }, [apiRef, hasFocus]);
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: handleRef,
    className: clsx(classes.root, headerClassName),
    style: _extends({}, style, {
      height,
      width,
      minWidth: width,
      maxWidth: width
    }),
    role: "columnheader",
    tabIndex: tabIndex,
    "aria-colindex": colIndex + 1,
    "aria-sort": ariaSort,
    "aria-label": headerComponent == null ? label : undefined
  }, other, {
    children: [/*#__PURE__*/_jsxs("div", _extends({
      className: classes.draggableContainer,
      draggable: isDraggable,
      role: "presentation"
    }, draggableContainerProps, {
      children: [/*#__PURE__*/_jsxs("div", {
        className: classes.titleContainer,
        role: "presentation",
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.titleContainerContent,
          children: headerComponent !== undefined ? headerComponent : /*#__PURE__*/_jsx(GridColumnHeaderTitle, {
            label: label,
            description: description,
            columnWidth: width
          })
        }), columnTitleIconButtons]
      }), columnMenuIconButton]
    })), /*#__PURE__*/_jsx(GridColumnHeaderSeparator, _extends({
      resizable: !rootProps.disableColumnResize && !!resizable,
      resizing: isResizing,
      height: height,
      side: separatorSide
    }, columnHeaderSeparatorProps)), columnMenu]
  }));
});
export { GridGenericColumnHeaderItem };