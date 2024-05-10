"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRootStyles = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _styles = require("@mui/material/styles");
var _gridClasses = require("../../constants/gridClasses");
function getBorderColor(theme) {
  if (theme.vars) {
    return theme.vars.palette.TableCell.border;
  }
  if (theme.palette.mode === 'light') {
    return (0, _styles.lighten)((0, _styles.alpha)(theme.palette.divider, 1), 0.88);
  }
  return (0, _styles.darken)((0, _styles.alpha)(theme.palette.divider, 1), 0.68);
}
const columnHeadersStyles = {
  [`.${_gridClasses.gridClasses.columnSeparator}, .${_gridClasses.gridClasses['columnSeparator--resizing']}`]: {
    visibility: 'visible',
    width: 'auto'
  }
};
const columnHeaderStyles = {
  [`& .${_gridClasses.gridClasses.iconButtonContainer}`]: {
    visibility: 'visible',
    width: 'auto'
  },
  [`& .${_gridClasses.gridClasses.menuIcon}`]: {
    width: 'auto',
    visibility: 'visible'
  }
};
const GridRootStyles = exports.GridRootStyles = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => [{
    [`&.${_gridClasses.gridClasses.autoHeight}`]: styles.autoHeight
  }, {
    [`&.${_gridClasses.gridClasses.aggregationColumnHeader}`]: styles.aggregationColumnHeader
  }, {
    [`&.${_gridClasses.gridClasses['aggregationColumnHeader--alignLeft']}`]: styles['aggregationColumnHeader--alignLeft']
  }, {
    [`&.${_gridClasses.gridClasses['aggregationColumnHeader--alignCenter']}`]: styles['aggregationColumnHeader--alignCenter']
  }, {
    [`&.${_gridClasses.gridClasses['aggregationColumnHeader--alignRight']}`]: styles['aggregationColumnHeader--alignRight']
  }, {
    [`&.${_gridClasses.gridClasses.aggregationColumnHeaderLabel}`]: styles.aggregationColumnHeaderLabel
  }, {
    [`&.${_gridClasses.gridClasses['root--disableUserSelection']} .${_gridClasses.gridClasses.cell}`]: styles['root--disableUserSelection']
  }, {
    [`&.${_gridClasses.gridClasses.autosizing}`]: styles.autosizing
  }, {
    [`& .${_gridClasses.gridClasses.editBooleanCell}`]: styles.editBooleanCell
  }, {
    [`& .${_gridClasses.gridClasses.cell}`]: styles.cell
  }, {
    [`& .${_gridClasses.gridClasses['cell--editing']}`]: styles['cell--editing']
  }, {
    [`& .${_gridClasses.gridClasses['cell--textCenter']}`]: styles['cell--textCenter']
  }, {
    [`& .${_gridClasses.gridClasses['cell--textLeft']}`]: styles['cell--textLeft']
  }, {
    [`& .${_gridClasses.gridClasses['cell--textRight']}`]: styles['cell--textRight']
  }, {
    [`& .${_gridClasses.gridClasses['cell--rangeTop']}`]: styles['cell--rangeTop']
  }, {
    [`& .${_gridClasses.gridClasses['cell--rangeBottom']}`]: styles['cell--rangeBottom']
  }, {
    [`& .${_gridClasses.gridClasses['cell--rangeLeft']}`]: styles['cell--rangeLeft']
  }, {
    [`& .${_gridClasses.gridClasses['cell--rangeRight']}`]: styles['cell--rangeRight']
  }, {
    [`& .${_gridClasses.gridClasses['cell--withRightBorder']}`]: styles['cell--withRightBorder']
  }, {
    [`& .${_gridClasses.gridClasses.cellCheckbox}`]: styles.cellCheckbox
  }, {
    [`& .${_gridClasses.gridClasses.cellSkeleton}`]: styles.cellSkeleton
  }, {
    [`& .${_gridClasses.gridClasses.checkboxInput}`]: styles.checkboxInput
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--alignCenter']}`]: styles['columnHeader--alignCenter']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--alignLeft']}`]: styles['columnHeader--alignLeft']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--alignRight']}`]: styles['columnHeader--alignRight']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--dragging']}`]: styles['columnHeader--dragging']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--moving']}`]: styles['columnHeader--moving']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--numeric']}`]: styles['columnHeader--numeric']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--sortable']}`]: styles['columnHeader--sortable']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--sorted']}`]: styles['columnHeader--sorted']
  }, {
    [`& .${_gridClasses.gridClasses['columnHeader--withRightBorder']}`]: styles['columnHeader--withRightBorder']
  }, {
    [`& .${_gridClasses.gridClasses.columnHeader}`]: styles.columnHeader
  }, {
    [`& .${_gridClasses.gridClasses.headerFilterRow}`]: styles.headerFilterRow
  }, {
    [`& .${_gridClasses.gridClasses.columnHeaderCheckbox}`]: styles.columnHeaderCheckbox
  }, {
    [`& .${_gridClasses.gridClasses.columnHeaderDraggableContainer}`]: styles.columnHeaderDraggableContainer
  }, {
    [`& .${_gridClasses.gridClasses.columnHeaderTitleContainer}`]: styles.columnHeaderTitleContainer
  }, {
    [`& .${_gridClasses.gridClasses['columnSeparator--resizable']}`]: styles['columnSeparator--resizable']
  }, {
    [`& .${_gridClasses.gridClasses['columnSeparator--resizing']}`]: styles['columnSeparator--resizing']
  }, {
    [`& .${_gridClasses.gridClasses.columnSeparator}`]: styles.columnSeparator
  }, {
    [`& .${_gridClasses.gridClasses.filterIcon}`]: styles.filterIcon
  }, {
    [`& .${_gridClasses.gridClasses.iconSeparator}`]: styles.iconSeparator
  }, {
    [`& .${_gridClasses.gridClasses.menuIcon}`]: styles.menuIcon
  }, {
    [`& .${_gridClasses.gridClasses.menuIconButton}`]: styles.menuIconButton
  }, {
    [`& .${_gridClasses.gridClasses.menuOpen}`]: styles.menuOpen
  }, {
    [`& .${_gridClasses.gridClasses.menuList}`]: styles.menuList
  }, {
    [`& .${_gridClasses.gridClasses['row--editable']}`]: styles['row--editable']
  }, {
    [`& .${_gridClasses.gridClasses['row--editing']}`]: styles['row--editing']
  }, {
    [`& .${_gridClasses.gridClasses['row--dragging']}`]: styles['row--dragging']
  }, {
    [`& .${_gridClasses.gridClasses.row}`]: styles.row
  }, {
    [`& .${_gridClasses.gridClasses.rowReorderCellPlaceholder}`]: styles.rowReorderCellPlaceholder
  }, {
    [`& .${_gridClasses.gridClasses.rowReorderCell}`]: styles.rowReorderCell
  }, {
    [`& .${_gridClasses.gridClasses['rowReorderCell--draggable']}`]: styles['rowReorderCell--draggable']
  }, {
    [`& .${_gridClasses.gridClasses.sortIcon}`]: styles.sortIcon
  }, {
    [`& .${_gridClasses.gridClasses.withBorderColor}`]: styles.withBorderColor
  }, {
    [`& .${_gridClasses.gridClasses.treeDataGroupingCell}`]: styles.treeDataGroupingCell
  }, {
    [`& .${_gridClasses.gridClasses.treeDataGroupingCellToggle}`]: styles.treeDataGroupingCellToggle
  }, {
    [`& .${_gridClasses.gridClasses.detailPanelToggleCell}`]: styles.detailPanelToggleCell
  }, {
    [`& .${_gridClasses.gridClasses['detailPanelToggleCell--expanded']}`]: styles['detailPanelToggleCell--expanded']
  }, styles.root]
})(({
  theme: t
}) => {
  const borderColor = getBorderColor(t);
  const radius = t.shape.borderRadius;
  const containerBackground = t.vars ? t.vars.palette.background.default : t.mixins.MuiDataGrid?.containerBackground ?? t.palette.background.default;
  const pinnedBackground = t.mixins.MuiDataGrid?.pinnedBackground ?? containerBackground;
  const overlayBackground = t.vars ? `rgba(${t.vars.palette.background.defaultChannel} / ${t.vars.palette.action.disabledOpacity})` : (0, _styles.alpha)(t.palette.background.default, t.palette.action.disabledOpacity);
  const hoverOpacity = (t.vars || t).palette.action.hoverOpacity;
  const hoverColor = (t.vars || t).palette.action.hover;
  const selectedOpacity = (t.vars || t).palette.action.selectedOpacity;
  const selectedBackground = t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / ${selectedOpacity})` : (0, _styles.alpha)(t.palette.primary.main, selectedOpacity);
  const selectedHoverBackground = t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / calc(
                ${t.vars.palette.action.selectedOpacity} + 
                ${t.vars.palette.action.hoverOpacity}
              ))` : (0, _styles.alpha)(t.palette.primary.main, t.palette.action.selectedOpacity + t.palette.action.hoverOpacity);
  const pinnedHoverBackground = t.vars ? hoverColor : blend(pinnedBackground, hoverColor, hoverOpacity);
  const pinnedSelectedBackground = t.vars ? selectedBackground : blend(pinnedBackground, selectedBackground, selectedOpacity);
  const pinnedSelectedHoverBackground = t.vars ? hoverColor : blend(pinnedSelectedBackground, hoverColor, hoverOpacity);
  const selectedStyles = {
    backgroundColor: selectedBackground,
    '&:hover': {
      backgroundColor: selectedHoverBackground,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: selectedBackground
      }
    }
  };
  const gridStyle = (0, _extends2.default)({
    '--unstable_DataGrid-radius': typeof radius === 'number' ? `${radius}px` : radius,
    '--unstable_DataGrid-headWeight': t.typography.fontWeightMedium,
    '--unstable_DataGrid-overlayBackground': overlayBackground,
    '--DataGrid-containerBackground': containerBackground,
    '--DataGrid-pinnedBackground': pinnedBackground,
    '--DataGrid-rowBorderColor': borderColor,
    '--DataGrid-cellOffsetMultiplier': 2,
    '--DataGrid-width': '0px',
    '--DataGrid-hasScrollX': '0',
    '--DataGrid-hasScrollY': '0',
    '--DataGrid-scrollbarSize': '10px',
    '--DataGrid-rowWidth': '0px',
    '--DataGrid-columnsTotalWidth': '0px',
    '--DataGrid-leftPinnedWidth': '0px',
    '--DataGrid-rightPinnedWidth': '0px',
    '--DataGrid-headerHeight': '0px',
    '--DataGrid-headersTotalHeight': '0px',
    '--DataGrid-topContainerHeight': '0px',
    '--DataGrid-bottomContainerHeight': '0px',
    flex: 1,
    boxSizing: 'border-box',
    position: 'relative',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor,
    borderRadius: 'var(--unstable_DataGrid-radius)',
    color: (t.vars || t).palette.text.primary
  }, t.typography.body2, {
    outline: 'none',
    height: '100%',
    display: 'flex',
    minWidth: 0,
    // See https://github.com/mui/mui-x/issues/8547
    minHeight: 0,
    flexDirection: 'column',
    overflowAnchor: 'none',
    // Keep the same scrolling position
    // The selector we really want here is `:first-child`, but emotion thinks it knows better than use what we
    // want and prints a warning to the console if we use it, about :first-child being "unsafe" in an SSR context.
    // https://github.com/emotion-js/emotion/issues/1105
    // Using `:first-of-type instead` is ironically less "safe" because if all our elements aren't `div`, this style
    // will fail to apply.
    [`.${_gridClasses.gridClasses.main} > *:first-of-type`]: {
      borderTopLeftRadius: 'var(--unstable_DataGrid-radius)',
      borderTopRightRadius: 'var(--unstable_DataGrid-radius)'
    },
    [`&.${_gridClasses.gridClasses.autoHeight}`]: {
      height: 'auto'
    },
    [`&.${_gridClasses.gridClasses.autosizing}`]: {
      [`& .${_gridClasses.gridClasses.columnHeaderTitleContainerContent} > *`]: {
        overflow: 'visible !important'
      },
      '@media (hover: hover)': {
        [`& .${_gridClasses.gridClasses.iconButtonContainer}`]: {
          width: '0 !important',
          visibility: 'hidden !important'
        },
        [`& .${_gridClasses.gridClasses.menuIcon}`]: {
          width: '0 !important',
          visibility: 'hidden !important'
        }
      },
      [`& .${_gridClasses.gridClasses.cell}`]: {
        overflow: 'visible !important',
        whiteSpace: 'nowrap',
        minWidth: 'max-content !important',
        maxWidth: 'max-content !important'
      },
      [`& .${_gridClasses.gridClasses.groupingCriteriaCell}`]: {
        width: 'unset'
      },
      [`& .${_gridClasses.gridClasses.treeDataGroupingCell}`]: {
        width: 'unset'
      }
    },
    [`& .${_gridClasses.gridClasses.columnHeader}, & .${_gridClasses.gridClasses.cell}`]: {
      WebkitTapHighlightColor: 'transparent',
      lineHeight: null,
      padding: '0 10px',
      boxSizing: 'border-box'
    },
    [`& .${_gridClasses.gridClasses.columnHeader}:focus-within, & .${_gridClasses.gridClasses.cell}:focus-within`]: {
      outline: `solid ${t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / 0.5)` : (0, _styles.alpha)(t.palette.primary.main, 0.5)} 1px`,
      outlineWidth: 1,
      outlineOffset: -1
    },
    [`& .${_gridClasses.gridClasses.columnHeader}:focus, & .${_gridClasses.gridClasses.cell}:focus`]: {
      outline: `solid ${t.palette.primary.main} 1px`
    },
    [`& .${_gridClasses.gridClasses.columnHeaderCheckbox}, & .${_gridClasses.gridClasses.cellCheckbox}`]: {
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    [`& .${_gridClasses.gridClasses.columnHeader}`]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--last']}`]: {
      overflow: 'hidden'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--sorted']} .${_gridClasses.gridClasses.iconButtonContainer}, & .${_gridClasses.gridClasses['columnHeader--filtered']} .${_gridClasses.gridClasses.iconButtonContainer}`]: {
      visibility: 'visible',
      width: 'auto'
    },
    [`& .${_gridClasses.gridClasses.columnHeader}:not(.${_gridClasses.gridClasses['columnHeader--sorted']}) .${_gridClasses.gridClasses.sortIcon}`]: {
      opacity: 0,
      transition: t.transitions.create(['opacity'], {
        duration: t.transitions.duration.shorter
      })
    },
    [`& .${_gridClasses.gridClasses.columnHeaderTitleContainer}`]: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      // to anchor the aggregation label
      position: 'relative'
    },
    [`& .${_gridClasses.gridClasses.columnHeaderTitleContainerContent}`]: {
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--filledGroup']} .${_gridClasses.gridClasses.columnHeaderTitleContainer}`]: {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      boxSizing: 'border-box'
    },
    [`& .${_gridClasses.gridClasses.sortIcon}, & .${_gridClasses.gridClasses.filterIcon}`]: {
      fontSize: 'inherit'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--sortable']}`]: {
      cursor: 'pointer'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--alignCenter']} .${_gridClasses.gridClasses.columnHeaderTitleContainer}`]: {
      justifyContent: 'center'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--alignRight']} .${_gridClasses.gridClasses.columnHeaderDraggableContainer}, & .${_gridClasses.gridClasses['columnHeader--alignRight']} .${_gridClasses.gridClasses.columnHeaderTitleContainer}`]: {
      flexDirection: 'row-reverse'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--alignCenter']} .${_gridClasses.gridClasses.menuIcon}, & .${_gridClasses.gridClasses['columnHeader--alignRight']} .${_gridClasses.gridClasses.menuIcon}`]: {
      marginRight: 'auto',
      marginLeft: -6
    },
    [`& .${_gridClasses.gridClasses['columnHeader--alignRight']} .${_gridClasses.gridClasses.menuIcon}, & .${_gridClasses.gridClasses['columnHeader--alignRight']} .${_gridClasses.gridClasses.menuIcon}`]: {
      marginRight: 'auto',
      marginLeft: -10
    },
    [`& .${_gridClasses.gridClasses['columnHeader--moving']}`]: {
      backgroundColor: (t.vars || t).palette.action.hover
    },
    [`& .${_gridClasses.gridClasses['columnHeader--pinnedLeft']}, & .${_gridClasses.gridClasses['columnHeader--pinnedRight']}`]: {
      position: 'sticky',
      zIndex: 4,
      // Should be above the column separator
      background: 'var(--DataGrid-pinnedBackground)'
    },
    [`& .${_gridClasses.gridClasses.columnSeparator}`]: {
      visibility: 'hidden',
      position: 'absolute',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: borderColor
    },
    [`& .${_gridClasses.gridClasses.columnHeaders}`]: {
      width: 'var(--DataGrid-rowWidth)'
    },
    '@media (hover: hover)': {
      [`& .${_gridClasses.gridClasses.columnHeaders}:hover`]: columnHeadersStyles,
      [`& .${_gridClasses.gridClasses.columnHeader}:hover`]: columnHeaderStyles,
      [`& .${_gridClasses.gridClasses.columnHeader}:not(.${_gridClasses.gridClasses['columnHeader--sorted']}):hover .${_gridClasses.gridClasses.sortIcon}`]: {
        opacity: 0.5
      }
    },
    '@media (hover: none)': {
      [`& .${_gridClasses.gridClasses.columnHeaders}`]: columnHeadersStyles,
      [`& .${_gridClasses.gridClasses.columnHeader}`]: columnHeaderStyles
    },
    [`& .${_gridClasses.gridClasses['columnSeparator--sideLeft']}`]: {
      left: -12
    },
    [`& .${_gridClasses.gridClasses['columnSeparator--sideRight']}`]: {
      right: -12
    },
    [`& .${_gridClasses.gridClasses['columnSeparator--resizable']}`]: {
      cursor: 'col-resize',
      touchAction: 'none',
      '&:hover': {
        color: (t.vars || t).palette.text.primary,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          color: borderColor
        }
      },
      [`&.${_gridClasses.gridClasses['columnSeparator--resizing']}`]: {
        color: (t.vars || t).palette.text.primary
      },
      '& svg': {
        pointerEvents: 'none'
      }
    },
    [`& .${_gridClasses.gridClasses.iconSeparator}`]: {
      color: 'inherit'
    },
    [`& .${_gridClasses.gridClasses.menuIcon}`]: {
      width: 0,
      visibility: 'hidden',
      fontSize: 20,
      marginRight: -10,
      display: 'flex',
      alignItems: 'center'
    },
    [`.${_gridClasses.gridClasses.menuOpen}`]: {
      visibility: 'visible',
      width: 'auto'
    },
    [`& .${_gridClasses.gridClasses.headerFilterRow}`]: {
      [`& .${_gridClasses.gridClasses.columnHeader}`]: {
        boxSizing: 'border-box',
        borderTop: '1px solid var(--DataGrid-rowBorderColor)'
      }
    },
    /* Row styles */
    [`.${_gridClasses.gridClasses.row}`]: {
      display: 'flex',
      width: 'var(--DataGrid-rowWidth)',
      breakInside: 'avoid',
      // Avoid the row to be broken in two different print pages.

      '--rowBorderColor': 'var(--DataGrid-rowBorderColor)',
      [`&.${_gridClasses.gridClasses['row--firstVisible']}`]: {
        '--rowBorderColor': 'transparent'
      },
      '&:hover': {
        backgroundColor: (t.vars || t).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&.Mui-selected': selectedStyles
    },
    [`& .${_gridClasses.gridClasses['container--top']}, & .${_gridClasses.gridClasses['container--bottom']}`]: {
      '[role=row]': {
        background: 'var(--DataGrid-containerBackground)'
      }
    },
    /* Cell styles */
    [`& .${_gridClasses.gridClasses.cell}`]: {
      height: 'var(--height)',
      minWidth: 'var(--width)',
      maxWidth: 'var(--width)',
      lineHeight: 'calc(var(--height) - 1px)',
      // -1px for the border

      boxSizing: 'border-box',
      borderTop: `1px solid var(--rowBorderColor)`,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '&.Mui-selected': selectedStyles
    },
    [`& .${_gridClasses.gridClasses['virtualScrollerContent--overflowed']} .${_gridClasses.gridClasses['row--lastVisible']} .${_gridClasses.gridClasses.cell}`]: {
      borderTopColor: 'transparent'
    },
    [`&.${_gridClasses.gridClasses['root--disableUserSelection']} .${_gridClasses.gridClasses.cell}`]: {
      userSelect: 'none'
    },
    [`& .${_gridClasses.gridClasses['row--dynamicHeight']} > .${_gridClasses.gridClasses.cell}`]: {
      whiteSpace: 'initial',
      lineHeight: 'inherit'
    },
    [`& .${_gridClasses.gridClasses.cellEmpty}`]: {
      padding: 0,
      height: 'unset'
    },
    [`& .${_gridClasses.gridClasses.cell}.${_gridClasses.gridClasses['cell--selectionMode']}`]: {
      cursor: 'default'
    },
    [`& .${_gridClasses.gridClasses.cell}.${_gridClasses.gridClasses['cell--editing']}`]: {
      padding: 1,
      display: 'flex',
      boxShadow: t.shadows[2],
      backgroundColor: (t.vars || t).palette.background.paper,
      '&:focus-within': {
        outline: `solid ${(t.vars || t).palette.primary.main} 1px`,
        outlineOffset: '-1px'
      }
    },
    [`& .${_gridClasses.gridClasses['row--editing']}`]: {
      boxShadow: t.shadows[2]
    },
    [`& .${_gridClasses.gridClasses['row--editing']} .${_gridClasses.gridClasses.cell}`]: {
      boxShadow: t.shadows[0],
      backgroundColor: (t.vars || t).palette.background.paper
    },
    [`& .${_gridClasses.gridClasses.editBooleanCell}`]: {
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    [`& .${_gridClasses.gridClasses.booleanCell}[data-value="true"]`]: {
      color: (t.vars || t).palette.text.secondary
    },
    [`& .${_gridClasses.gridClasses.booleanCell}[data-value="false"]`]: {
      color: (t.vars || t).palette.text.disabled
    },
    [`& .${_gridClasses.gridClasses.actionsCell}`]: {
      display: 'inline-flex',
      alignItems: 'center',
      gridGap: t.spacing(1)
    },
    [`& .${_gridClasses.gridClasses.rowReorderCell}`]: {
      display: 'inline-flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: (t.vars || t).palette.action.disabledOpacity
    },
    [`& .${_gridClasses.gridClasses['rowReorderCell--draggable']}`]: {
      cursor: 'move',
      opacity: 1
    },
    [`& .${_gridClasses.gridClasses.rowReorderCellContainer}`]: {
      padding: 0,
      display: 'flex',
      alignItems: 'stretch'
    },
    [`.${_gridClasses.gridClasses.withBorderColor}`]: {
      borderColor
    },
    [`& .${_gridClasses.gridClasses['cell--withLeftBorder']}, & .${_gridClasses.gridClasses['columnHeader--withLeftBorder']}`]: {
      borderLeftColor: 'var(--DataGrid-rowBorderColor)',
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid'
    },
    [`& .${_gridClasses.gridClasses['cell--withRightBorder']}, & .${_gridClasses.gridClasses['columnHeader--withRightBorder']}`]: {
      borderRightColor: 'var(--DataGrid-rowBorderColor)',
      borderRightWidth: '1px',
      borderRightStyle: 'solid'
    },
    [`& .${_gridClasses.gridClasses['cell--flex']}`]: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 'inherit'
    },
    [`& .${_gridClasses.gridClasses['cell--textLeft']}`]: {
      textAlign: 'left',
      justifyContent: 'flex-start'
    },
    [`& .${_gridClasses.gridClasses['cell--textRight']}`]: {
      textAlign: 'right',
      justifyContent: 'flex-end'
    },
    [`& .${_gridClasses.gridClasses['cell--textCenter']}`]: {
      textAlign: 'center',
      justifyContent: 'center'
    },
    [`& .${_gridClasses.gridClasses['cell--pinnedLeft']}, & .${_gridClasses.gridClasses['cell--pinnedRight']}`]: {
      position: 'sticky',
      zIndex: 3,
      background: 'var(--DataGrid-pinnedBackground)'
    },
    [`& .${_gridClasses.gridClasses.virtualScrollerContent} .${_gridClasses.gridClasses.row}`]: {
      '&:hover': {
        [`& .${_gridClasses.gridClasses['cell--pinnedLeft']}, & .${_gridClasses.gridClasses['cell--pinnedRight']}`]: {
          backgroundColor: pinnedHoverBackground
        }
      },
      [`&.Mui-selected`]: {
        [`& .${_gridClasses.gridClasses['cell--pinnedLeft']}, & .${_gridClasses.gridClasses['cell--pinnedRight']}`]: {
          backgroundColor: pinnedSelectedBackground
        },
        '&:hover': {
          [`& .${_gridClasses.gridClasses['cell--pinnedLeft']}, & .${_gridClasses.gridClasses['cell--pinnedRight']}`]: {
            backgroundColor: pinnedSelectedHoverBackground
          }
        }
      }
    },
    [`& .${_gridClasses.gridClasses.cellOffsetLeft}`]: {
      flex: '0 0 auto',
      display: 'inline-block'
    },
    [`& .${_gridClasses.gridClasses.cellSkeleton}`]: {
      flex: '0 0 auto',
      height: '100%',
      display: 'inline-flex',
      alignItems: 'center'
    },
    [`& .${_gridClasses.gridClasses.columnHeaderDraggableContainer}`]: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    [`& .${_gridClasses.gridClasses.rowReorderCellPlaceholder}`]: {
      display: 'none'
    },
    [`& .${_gridClasses.gridClasses['columnHeader--dragging']}, & .${_gridClasses.gridClasses['row--dragging']}`]: {
      background: (t.vars || t).palette.background.paper,
      padding: '0 12px',
      borderRadius: 'var(--unstable_DataGrid-radius)',
      opacity: (t.vars || t).palette.action.disabledOpacity
    },
    [`& .${_gridClasses.gridClasses['row--dragging']}`]: {
      background: (t.vars || t).palette.background.paper,
      padding: '0 12px',
      borderRadius: 'var(--unstable_DataGrid-radius)',
      opacity: (t.vars || t).palette.action.disabledOpacity,
      [`& .${_gridClasses.gridClasses.rowReorderCellPlaceholder}`]: {
        display: 'flex'
      }
    },
    [`& .${_gridClasses.gridClasses.treeDataGroupingCell}`]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    [`& .${_gridClasses.gridClasses.treeDataGroupingCellToggle}`]: {
      flex: '0 0 28px',
      alignSelf: 'stretch',
      marginRight: t.spacing(2)
    },
    [`& .${_gridClasses.gridClasses.groupingCriteriaCell}`]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    [`& .${_gridClasses.gridClasses.groupingCriteriaCellToggle}`]: {
      flex: '0 0 28px',
      alignSelf: 'stretch',
      marginRight: t.spacing(2)
    },
    /* ScrollbarFiller styles */
    [`.${_gridClasses.gridClasses.scrollbarFiller}`]: {
      minWidth: 'calc(var(--DataGrid-hasScrollY) * var(--DataGrid-scrollbarSize))',
      alignSelf: 'stretch',
      [`&.${_gridClasses.gridClasses['scrollbarFiller--borderTop']}`]: {
        borderTop: '1px solid var(--DataGrid-rowBorderColor)'
      },
      [`&.${_gridClasses.gridClasses['scrollbarFiller--pinnedRight']}`]: {
        backgroundColor: 'var(--DataGrid-pinnedBackground)',
        position: 'sticky',
        right: 0
      }
    },
    [`& .${_gridClasses.gridClasses.filler}`]: {
      flex: 1
    },
    [`& .${_gridClasses.gridClasses['filler--borderTop']}`]: {
      borderTop: '1px solid var(--DataGrid-rowBorderColor)'
    }
  });
  return gridStyle;
});

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 */
function blend(background, overlay, opacity, gamma = 1) {
  const f = (b, o) => Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);
  const backgroundColor = (0, _styles.decomposeColor)(background);
  const overlayColor = (0, _styles.decomposeColor)(overlay);
  const rgb = [f(backgroundColor.values[0], overlayColor.values[0]), f(backgroundColor.values[1], overlayColor.values[1]), f(backgroundColor.values[2], overlayColor.values[2])];
  return (0, _styles.recomposeColor)({
    type: 'rgb',
    values: rgb
  });
}