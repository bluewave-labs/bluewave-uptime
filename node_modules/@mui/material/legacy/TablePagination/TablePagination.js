'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var _InputBase;
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import { isHostComponent } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import InputBase from '../InputBase';
import MenuItem from '../MenuItem';
import Select from '../Select';
import TableCell from '../TableCell';
import Toolbar from '../Toolbar';
import TablePaginationActions from './TablePaginationActions';
import useId from '../utils/useId';
import tablePaginationClasses, { getTablePaginationUtilityClass } from './tablePaginationClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TablePaginationRoot = styled(TableCell, {
  name: 'MuiTablePagination',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    overflow: 'auto',
    color: (theme.vars || theme).palette.text.primary,
    fontSize: theme.typography.pxToRem(14),
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0
    }
  };
});
var TablePaginationToolbar = styled(Toolbar, {
  name: 'MuiTablePagination',
  slot: 'Toolbar',
  overridesResolver: function overridesResolver(props, styles) {
    return _extends(_defineProperty({}, "& .".concat(tablePaginationClasses.actions), styles.actions), styles.toolbar);
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return _defineProperty(_defineProperty(_defineProperty({
    minHeight: 52,
    paddingRight: 2
  }, "".concat(theme.breakpoints.up('xs'), " and (orientation: landscape)"), {
    minHeight: 52
  }), theme.breakpoints.up('sm'), {
    minHeight: 52,
    paddingRight: 2
  }), "& .".concat(tablePaginationClasses.actions), {
    flexShrink: 0,
    marginLeft: 20
  });
});
var TablePaginationSpacer = styled('div', {
  name: 'MuiTablePagination',
  slot: 'Spacer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.spacer;
  }
})({
  flex: '1 1 100%'
});
var TablePaginationSelectLabel = styled('p', {
  name: 'MuiTablePagination',
  slot: 'SelectLabel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.selectLabel;
  }
})(function (_ref4) {
  var theme = _ref4.theme;
  return _extends({}, theme.typography.body2, {
    flexShrink: 0
  });
});
var TablePaginationSelect = styled(Select, {
  name: 'MuiTablePagination',
  slot: 'Select',
  overridesResolver: function overridesResolver(props, styles) {
    return _extends(_defineProperty(_defineProperty({}, "& .".concat(tablePaginationClasses.selectIcon), styles.selectIcon), "& .".concat(tablePaginationClasses.select), styles.select), styles.input, styles.selectRoot);
  }
})(_defineProperty({
  color: 'inherit',
  fontSize: 'inherit',
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8
}, "& .".concat(tablePaginationClasses.select), {
  paddingLeft: 8,
  paddingRight: 24,
  textAlign: 'right',
  textAlignLast: 'right' // Align <select> on Chrome.
}));
var TablePaginationMenuItem = styled(MenuItem, {
  name: 'MuiTablePagination',
  slot: 'MenuItem',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.menuItem;
  }
})({});
var TablePaginationDisplayedRows = styled('p', {
  name: 'MuiTablePagination',
  slot: 'DisplayedRows',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.displayedRows;
  }
})(function (_ref5) {
  var theme = _ref5.theme;
  return _extends({}, theme.typography.body2, {
    flexShrink: 0
  });
});
function defaultLabelDisplayedRows(_ref6) {
  var from = _ref6.from,
    to = _ref6.to,
    count = _ref6.count;
  return "".concat(from, "\u2013").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
}
function defaultGetAriaLabel(type) {
  return "Go to ".concat(type, " page");
}
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions']
  };
  return composeClasses(slots, getTablePaginationUtilityClass, classes);
};

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
var TablePagination = /*#__PURE__*/React.forwardRef(function TablePagination(inProps, ref) {
  var _slotProps$select;
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTablePagination'
  });
  var _props$ActionsCompone = props.ActionsComponent,
    ActionsComponent = _props$ActionsCompone === void 0 ? TablePaginationActions : _props$ActionsCompone,
    backIconButtonProps = props.backIconButtonProps,
    className = props.className,
    colSpanProp = props.colSpan,
    _props$component = props.component,
    component = _props$component === void 0 ? TableCell : _props$component,
    count = props.count,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$getItemAriaLab = props.getItemAriaLabel,
    getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
    _props$labelDisplayed = props.labelDisplayedRows,
    labelDisplayedRows = _props$labelDisplayed === void 0 ? defaultLabelDisplayedRows : _props$labelDisplayed,
    _props$labelRowsPerPa = props.labelRowsPerPage,
    labelRowsPerPage = _props$labelRowsPerPa === void 0 ? 'Rows per page:' : _props$labelRowsPerPa,
    nextIconButtonProps = props.nextIconButtonProps,
    onPageChange = props.onPageChange,
    onRowsPerPageChange = props.onRowsPerPageChange,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    _props$rowsPerPageOpt = props.rowsPerPageOptions,
    rowsPerPageOptions = _props$rowsPerPageOpt === void 0 ? [10, 25, 50, 100] : _props$rowsPerPageOpt,
    _props$SelectProps = props.SelectProps,
    SelectProps = _props$SelectProps === void 0 ? {} : _props$SelectProps,
    _props$showFirstButto = props.showFirstButton,
    showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
    _props$showLastButton = props.showLastButton,
    showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["ActionsComponent", "backIconButtonProps", "className", "colSpan", "component", "count", "disabled", "getItemAriaLabel", "labelDisplayedRows", "labelRowsPerPage", "nextIconButtonProps", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps", "showFirstButton", "showLastButton", "slotProps", "slots"]);
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var selectProps = (_slotProps$select = slotProps == null ? void 0 : slotProps.select) != null ? _slotProps$select : SelectProps;
  var MenuItemComponent = selectProps.native ? 'option' : TablePaginationMenuItem;
  var colSpan;
  if (component === TableCell || component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }
  var selectId = useId(selectProps.id);
  var labelId = useId(selectProps.labelId);
  var getLabelDisplayedRowsTo = function getLabelDisplayedRowsTo() {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  return /*#__PURE__*/_jsx(TablePaginationRoot, _extends({
    colSpan: colSpan,
    ref: ref,
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other, {
    children: /*#__PURE__*/_jsxs(TablePaginationToolbar, {
      className: classes.toolbar,
      children: [/*#__PURE__*/_jsx(TablePaginationSpacer, {
        className: classes.spacer
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(TablePaginationSelectLabel, {
        className: classes.selectLabel,
        id: labelId,
        children: labelRowsPerPage
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(TablePaginationSelect, _extends({
        variant: "standard"
      }, !selectProps.variant && {
        input: _InputBase || (_InputBase = /*#__PURE__*/_jsx(InputBase, {}))
      }, {
        value: rowsPerPage,
        onChange: onRowsPerPageChange,
        id: selectId,
        labelId: labelId
      }, selectProps, {
        classes: _extends({}, selectProps.classes, {
          // TODO v5 remove `classes.input`
          root: clsx(classes.input, classes.selectRoot, (selectProps.classes || {}).root),
          select: clsx(classes.select, (selectProps.classes || {}).select),
          // TODO v5 remove `selectIcon`
          icon: clsx(classes.selectIcon, (selectProps.classes || {}).icon)
        }),
        disabled: disabled,
        children: rowsPerPageOptions.map(function (rowsPerPageOption) {
          return /*#__PURE__*/_createElement(MenuItemComponent, _extends({}, !isHostComponent(MenuItemComponent) && {
            ownerState: ownerState
          }, {
            className: classes.menuItem,
            key: rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
            value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
          }), rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
        })
      })), /*#__PURE__*/_jsx(TablePaginationDisplayedRows, {
        className: classes.displayedRows,
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page: page
        })
      }), /*#__PURE__*/_jsx(ActionsComponent, {
        className: classes.actions,
        backIconButtonProps: backIconButtonProps,
        count: count,
        nextIconButtonProps: nextIconButtonProps,
        onPageChange: onPageChange,
        page: page,
        rowsPerPage: rowsPerPage,
        showFirstButton: showFirstButton,
        showLastButton: showLastButton,
        slotProps: slotProps.actions,
        slots: slots.actions,
        getItemAriaLabel: getItemAriaLabel,
        disabled: disabled
      })]
    })
  }));
});
process.env.NODE_ENV !== "production" ? TablePagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: PropTypes.elementType,
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) component.
   *
   * This prop is an alias for `slotProps.actions.previousButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.actions.previousButton` instead.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: integerPropType.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: PropTypes.node,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   *
   * This prop is an alias for `slotProps.actions.nextButton` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.actions.nextButton` instead.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: PropTypes.func,
  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType.isRequired, function (props) {
    var count = props.count,
      page = props.page,
      rowsPerPage = props.rowsPerPage;
    if (count === -1) {
      return null;
    }
    var newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page < 0 || page > newLastPage) {
      return new Error('MUI: The page prop of a TablePagination is out of range ' + "(0 to ".concat(newLastPage, ", but page is ").concat(page, ")."));
    }
    return null;
  }),
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })]).isRequired),
  /**
   * Props applied to the rows per page [`Select`](/material-ui/api/select/) element.
   *
   * This prop is an alias for `slotProps.select` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.select` instead.
   *
   * @default {}
   */
  SelectProps: PropTypes.object,
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: PropTypes.shape({
    actions: PropTypes.shape({
      firstButton: PropTypes.object,
      firstButtonIcon: PropTypes.object,
      lastButton: PropTypes.object,
      lastButtonIcon: PropTypes.object,
      nextButton: PropTypes.object,
      nextButtonIcon: PropTypes.object,
      previousButton: PropTypes.object,
      previousButtonIcon: PropTypes.object
    }),
    select: PropTypes.object
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    actions: PropTypes.shape({
      firstButton: PropTypes.elementType,
      firstButtonIcon: PropTypes.elementType,
      lastButton: PropTypes.elementType,
      lastButtonIcon: PropTypes.elementType,
      nextButton: PropTypes.elementType,
      nextButtonIcon: PropTypes.elementType,
      previousButton: PropTypes.elementType,
      previousButtonIcon: PropTypes.elementType
    })
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default TablePagination;