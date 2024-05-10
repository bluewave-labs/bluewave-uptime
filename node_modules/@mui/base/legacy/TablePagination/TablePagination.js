'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { useSlotProps } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { isHostComponent } from '../utils/isHostComponent';
import { TablePaginationActions } from './TablePaginationActions';
import { getTablePaginationUtilityClass } from './tablePaginationClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
function defaultLabelDisplayedRows(_ref) {
  var from = _ref.from,
    to = _ref.to,
    count = _ref.count;
  return "".concat(from, "\u2013").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
}
function defaultGetAriaLabel(type) {
  return "Go to ".concat(type, " page");
}
var useUtilityClasses = function useUtilityClasses() {
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
  return composeClasses(slots, useClassNamesOverride(getTablePaginationUtilityClass));
};

/**
 * A pagination for tables.
 *
 * Demos:
 *
 * - [Table Pagination](https://mui.com/base-ui/react-table-pagination/)
 *
 * API:
 *
 * - [TablePagination API](https://mui.com/base-ui/react-table-pagination/components-api/#table-pagination)
 */
var TablePagination = /*#__PURE__*/React.forwardRef(function TablePagination(props, forwardedRef) {
  var _slots$root, _slots$select, _slots$actions, _slots$menuItem, _slots$selectLabel, _slots$displayedRows, _slots$toolbar, _slots$spacer;
  var colSpanProp = props.colSpan,
    count = props.count,
    _props$getItemAriaLab = props.getItemAriaLabel,
    getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
    _props$labelDisplayed = props.labelDisplayedRows,
    labelDisplayedRows = _props$labelDisplayed === void 0 ? defaultLabelDisplayedRows : _props$labelDisplayed,
    labelIdProp = props.labelId,
    _props$labelRowsPerPa = props.labelRowsPerPage,
    labelRowsPerPage = _props$labelRowsPerPa === void 0 ? 'Rows per page:' : _props$labelRowsPerPa,
    onPageChange = props.onPageChange,
    onRowsPerPageChange = props.onRowsPerPageChange,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    _props$rowsPerPageOpt = props.rowsPerPageOptions,
    rowsPerPageOptions = _props$rowsPerPageOpt === void 0 ? [10, 25, 50, 100] : _props$rowsPerPageOpt,
    selectIdProp = props.selectId,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelId", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "selectId", "slotProps", "slots"]);
  var ownerState = props;
  var classes = useUtilityClasses();
  var colSpan;
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'td';
  if (Root === 'td' || !isHostComponent(Root)) {
    colSpan = colSpanProp || 1000; // col-span over everything
  }
  var getLabelDisplayedRowsTo = function getLabelDisplayedRowsTo() {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };
  var selectId = useId(selectIdProp);
  var labelId = useId(labelIdProp);
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      colSpan: colSpan,
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: classes.root
  });
  var Select = (_slots$select = slots.select) != null ? _slots$select : 'select';
  var selectProps = useSlotProps({
    elementType: Select,
    externalSlotProps: slotProps.select,
    additionalProps: {
      value: rowsPerPage,
      id: selectId,
      onChange: function onChange(event) {
        return onRowsPerPageChange && onRowsPerPageChange(event);
      },
      'aria-label': rowsPerPage.toString(),
      'aria-labelledby': [labelId, selectId].filter(Boolean).join(' ') || undefined
    },
    ownerState: ownerState,
    className: classes.select
  });
  var Actions = (_slots$actions = slots.actions) != null ? _slots$actions : TablePaginationActions;
  var actionsProps = useSlotProps({
    elementType: Actions,
    externalSlotProps: slotProps.actions,
    additionalProps: {
      page: page,
      rowsPerPage: rowsPerPage,
      count: count,
      onPageChange: onPageChange,
      getItemAriaLabel: getItemAriaLabel
    },
    ownerState: ownerState,
    className: classes.actions
  });
  var MenuItem = (_slots$menuItem = slots.menuItem) != null ? _slots$menuItem : 'option';
  var menuItemProps = useSlotProps({
    elementType: MenuItem,
    externalSlotProps: slotProps.menuItem,
    additionalProps: {
      value: undefined
    },
    ownerState: ownerState,
    className: classes.menuItem
  });
  var SelectLabel = (_slots$selectLabel = slots.selectLabel) != null ? _slots$selectLabel : 'p';
  var selectLabelProps = useSlotProps({
    elementType: SelectLabel,
    externalSlotProps: slotProps.selectLabel,
    additionalProps: {
      id: labelId
    },
    ownerState: ownerState,
    className: classes.selectLabel
  });
  var DisplayedRows = (_slots$displayedRows = slots.displayedRows) != null ? _slots$displayedRows : 'p';
  var displayedRowsProps = useSlotProps({
    elementType: DisplayedRows,
    externalSlotProps: slotProps.displayedRows,
    ownerState: ownerState,
    className: classes.displayedRows
  });
  var Toolbar = (_slots$toolbar = slots.toolbar) != null ? _slots$toolbar : 'div';
  var toolbarProps = useSlotProps({
    elementType: Toolbar,
    externalSlotProps: slotProps.toolbar,
    ownerState: ownerState,
    className: classes.toolbar
  });
  var Spacer = (_slots$spacer = slots.spacer) != null ? _slots$spacer : 'div';
  var spacerProps = useSlotProps({
    elementType: Spacer,
    externalSlotProps: slotProps.spacer,
    ownerState: ownerState,
    className: classes.spacer
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: /*#__PURE__*/_jsxs(Toolbar, _extends({}, toolbarProps, {
      children: [/*#__PURE__*/_jsx(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(SelectLabel, _extends({}, selectLabelProps, {
        children: labelRowsPerPage
      })), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(Select, _extends({}, selectProps, {
        children: rowsPerPageOptions.map(function (rowsPerPageOption) {
          return /*#__PURE__*/_createElement(MenuItem, _extends({}, menuItemProps, {
            key: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
            value: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
          }), typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
        })
      })), /*#__PURE__*/_jsx(DisplayedRows, _extends({}, displayedRowsProps, {
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page: page
        })
      })), /*#__PURE__*/_jsx(Actions, _extends({}, actionsProps))]
    }))
  }));
});
process.env.NODE_ENV !== "production" ? TablePagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: PropTypes.number.isRequired,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Id of the label element within the pagination.
   */
  labelId: PropTypes.string,
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: PropTypes.node,
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
   * Id of the select element within the pagination.
   */
  selectId: PropTypes.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    actions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    displayedRows: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    menuItem: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    spacer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    actions: PropTypes.elementType,
    displayedRows: PropTypes.elementType,
    menuItem: PropTypes.elementType,
    root: PropTypes.elementType,
    select: PropTypes.elementType,
    selectLabel: PropTypes.elementType,
    spacer: PropTypes.elementType,
    toolbar: PropTypes.elementType
  })
} : void 0;
export { TablePagination };