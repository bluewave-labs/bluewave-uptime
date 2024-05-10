import _extends from "@babel/runtime/helpers/esm/extends";
import { alpha, styled, darken, lighten, decomposeColor, recomposeColor } from '@mui/material/styles';
import { gridClasses as c } from '../../constants/gridClasses';
function getBorderColor(theme) {
  if (theme.vars) {
    return theme.vars.palette.TableCell.border;
  }
  if (theme.palette.mode === 'light') {
    return lighten(alpha(theme.palette.divider, 1), 0.88);
  }
  return darken(alpha(theme.palette.divider, 1), 0.68);
}
const columnHeadersStyles = {
  [`.${c.columnSeparator}, .${c['columnSeparator--resizing']}`]: {
    visibility: 'visible',
    width: 'auto'
  }
};
const columnHeaderStyles = {
  [`& .${c.iconButtonContainer}`]: {
    visibility: 'visible',
    width: 'auto'
  },
  [`& .${c.menuIcon}`]: {
    width: 'auto',
    visibility: 'visible'
  }
};
export const GridRootStyles = styled('div', {
  name: 'MuiDataGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => [{
    [`&.${c.autoHeight}`]: styles.autoHeight
  }, {
    [`&.${c.aggregationColumnHeader}`]: styles.aggregationColumnHeader
  }, {
    [`&.${c['aggregationColumnHeader--alignLeft']}`]: styles['aggregationColumnHeader--alignLeft']
  }, {
    [`&.${c['aggregationColumnHeader--alignCenter']}`]: styles['aggregationColumnHeader--alignCenter']
  }, {
    [`&.${c['aggregationColumnHeader--alignRight']}`]: styles['aggregationColumnHeader--alignRight']
  }, {
    [`&.${c.aggregationColumnHeaderLabel}`]: styles.aggregationColumnHeaderLabel
  }, {
    [`&.${c['root--disableUserSelection']} .${c.cell}`]: styles['root--disableUserSelection']
  }, {
    [`&.${c.autosizing}`]: styles.autosizing
  }, {
    [`& .${c.editBooleanCell}`]: styles.editBooleanCell
  }, {
    [`& .${c.cell}`]: styles.cell
  }, {
    [`& .${c['cell--editing']}`]: styles['cell--editing']
  }, {
    [`& .${c['cell--textCenter']}`]: styles['cell--textCenter']
  }, {
    [`& .${c['cell--textLeft']}`]: styles['cell--textLeft']
  }, {
    [`& .${c['cell--textRight']}`]: styles['cell--textRight']
  }, {
    [`& .${c['cell--rangeTop']}`]: styles['cell--rangeTop']
  }, {
    [`& .${c['cell--rangeBottom']}`]: styles['cell--rangeBottom']
  }, {
    [`& .${c['cell--rangeLeft']}`]: styles['cell--rangeLeft']
  }, {
    [`& .${c['cell--rangeRight']}`]: styles['cell--rangeRight']
  }, {
    [`& .${c['cell--withRightBorder']}`]: styles['cell--withRightBorder']
  }, {
    [`& .${c.cellCheckbox}`]: styles.cellCheckbox
  }, {
    [`& .${c.cellSkeleton}`]: styles.cellSkeleton
  }, {
    [`& .${c.checkboxInput}`]: styles.checkboxInput
  }, {
    [`& .${c['columnHeader--alignCenter']}`]: styles['columnHeader--alignCenter']
  }, {
    [`& .${c['columnHeader--alignLeft']}`]: styles['columnHeader--alignLeft']
  }, {
    [`& .${c['columnHeader--alignRight']}`]: styles['columnHeader--alignRight']
  }, {
    [`& .${c['columnHeader--dragging']}`]: styles['columnHeader--dragging']
  }, {
    [`& .${c['columnHeader--moving']}`]: styles['columnHeader--moving']
  }, {
    [`& .${c['columnHeader--numeric']}`]: styles['columnHeader--numeric']
  }, {
    [`& .${c['columnHeader--sortable']}`]: styles['columnHeader--sortable']
  }, {
    [`& .${c['columnHeader--sorted']}`]: styles['columnHeader--sorted']
  }, {
    [`& .${c['columnHeader--withRightBorder']}`]: styles['columnHeader--withRightBorder']
  }, {
    [`& .${c.columnHeader}`]: styles.columnHeader
  }, {
    [`& .${c.headerFilterRow}`]: styles.headerFilterRow
  }, {
    [`& .${c.columnHeaderCheckbox}`]: styles.columnHeaderCheckbox
  }, {
    [`& .${c.columnHeaderDraggableContainer}`]: styles.columnHeaderDraggableContainer
  }, {
    [`& .${c.columnHeaderTitleContainer}`]: styles.columnHeaderTitleContainer
  }, {
    [`& .${c['columnSeparator--resizable']}`]: styles['columnSeparator--resizable']
  }, {
    [`& .${c['columnSeparator--resizing']}`]: styles['columnSeparator--resizing']
  }, {
    [`& .${c.columnSeparator}`]: styles.columnSeparator
  }, {
    [`& .${c.filterIcon}`]: styles.filterIcon
  }, {
    [`& .${c.iconSeparator}`]: styles.iconSeparator
  }, {
    [`& .${c.menuIcon}`]: styles.menuIcon
  }, {
    [`& .${c.menuIconButton}`]: styles.menuIconButton
  }, {
    [`& .${c.menuOpen}`]: styles.menuOpen
  }, {
    [`& .${c.menuList}`]: styles.menuList
  }, {
    [`& .${c['row--editable']}`]: styles['row--editable']
  }, {
    [`& .${c['row--editing']}`]: styles['row--editing']
  }, {
    [`& .${c['row--dragging']}`]: styles['row--dragging']
  }, {
    [`& .${c.row}`]: styles.row
  }, {
    [`& .${c.rowReorderCellPlaceholder}`]: styles.rowReorderCellPlaceholder
  }, {
    [`& .${c.rowReorderCell}`]: styles.rowReorderCell
  }, {
    [`& .${c['rowReorderCell--draggable']}`]: styles['rowReorderCell--draggable']
  }, {
    [`& .${c.sortIcon}`]: styles.sortIcon
  }, {
    [`& .${c.withBorderColor}`]: styles.withBorderColor
  }, {
    [`& .${c.treeDataGroupingCell}`]: styles.treeDataGroupingCell
  }, {
    [`& .${c.treeDataGroupingCellToggle}`]: styles.treeDataGroupingCellToggle
  }, {
    [`& .${c.detailPanelToggleCell}`]: styles.detailPanelToggleCell
  }, {
    [`& .${c['detailPanelToggleCell--expanded']}`]: styles['detailPanelToggleCell--expanded']
  }, styles.root]
})(({
  theme: t
}) => {
  const borderColor = getBorderColor(t);
  const radius = t.shape.borderRadius;
  const containerBackground = t.vars ? t.vars.palette.background.default : t.mixins.MuiDataGrid?.containerBackground ?? t.palette.background.default;
  const pinnedBackground = t.mixins.MuiDataGrid?.pinnedBackground ?? containerBackground;
  const overlayBackground = t.vars ? `rgba(${t.vars.palette.background.defaultChannel} / ${t.vars.palette.action.disabledOpacity})` : alpha(t.palette.background.default, t.palette.action.disabledOpacity);
  const hoverOpacity = (t.vars || t).palette.action.hoverOpacity;
  const hoverColor = (t.vars || t).palette.action.hover;
  const selectedOpacity = (t.vars || t).palette.action.selectedOpacity;
  const selectedBackground = t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / ${selectedOpacity})` : alpha(t.palette.primary.main, selectedOpacity);
  const selectedHoverBackground = t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / calc(
                ${t.vars.palette.action.selectedOpacity} + 
                ${t.vars.palette.action.hoverOpacity}
              ))` : alpha(t.palette.primary.main, t.palette.action.selectedOpacity + t.palette.action.hoverOpacity);
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
  const gridStyle = _extends({
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
    [`.${c.main} > *:first-of-type`]: {
      borderTopLeftRadius: 'var(--unstable_DataGrid-radius)',
      borderTopRightRadius: 'var(--unstable_DataGrid-radius)'
    },
    [`&.${c.autoHeight}`]: {
      height: 'auto'
    },
    [`&.${c.autosizing}`]: {
      [`& .${c.columnHeaderTitleContainerContent} > *`]: {
        overflow: 'visible !important'
      },
      '@media (hover: hover)': {
        [`& .${c.iconButtonContainer}`]: {
          width: '0 !important',
          visibility: 'hidden !important'
        },
        [`& .${c.menuIcon}`]: {
          width: '0 !important',
          visibility: 'hidden !important'
        }
      },
      [`& .${c.cell}`]: {
        overflow: 'visible !important',
        whiteSpace: 'nowrap',
        minWidth: 'max-content !important',
        maxWidth: 'max-content !important'
      },
      [`& .${c.groupingCriteriaCell}`]: {
        width: 'unset'
      },
      [`& .${c.treeDataGroupingCell}`]: {
        width: 'unset'
      }
    },
    [`& .${c.columnHeader}, & .${c.cell}`]: {
      WebkitTapHighlightColor: 'transparent',
      lineHeight: null,
      padding: '0 10px',
      boxSizing: 'border-box'
    },
    [`& .${c.columnHeader}:focus-within, & .${c.cell}:focus-within`]: {
      outline: `solid ${t.vars ? `rgba(${t.vars.palette.primary.mainChannel} / 0.5)` : alpha(t.palette.primary.main, 0.5)} 1px`,
      outlineWidth: 1,
      outlineOffset: -1
    },
    [`& .${c.columnHeader}:focus, & .${c.cell}:focus`]: {
      outline: `solid ${t.palette.primary.main} 1px`
    },
    [`& .${c.columnHeaderCheckbox}, & .${c.cellCheckbox}`]: {
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    [`& .${c.columnHeader}`]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    [`& .${c['columnHeader--last']}`]: {
      overflow: 'hidden'
    },
    [`& .${c['columnHeader--sorted']} .${c.iconButtonContainer}, & .${c['columnHeader--filtered']} .${c.iconButtonContainer}`]: {
      visibility: 'visible',
      width: 'auto'
    },
    [`& .${c.columnHeader}:not(.${c['columnHeader--sorted']}) .${c.sortIcon}`]: {
      opacity: 0,
      transition: t.transitions.create(['opacity'], {
        duration: t.transitions.duration.shorter
      })
    },
    [`& .${c.columnHeaderTitleContainer}`]: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      // to anchor the aggregation label
      position: 'relative'
    },
    [`& .${c.columnHeaderTitleContainerContent}`]: {
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    },
    [`& .${c['columnHeader--filledGroup']} .${c.columnHeaderTitleContainer}`]: {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      boxSizing: 'border-box'
    },
    [`& .${c.sortIcon}, & .${c.filterIcon}`]: {
      fontSize: 'inherit'
    },
    [`& .${c['columnHeader--sortable']}`]: {
      cursor: 'pointer'
    },
    [`& .${c['columnHeader--alignCenter']} .${c.columnHeaderTitleContainer}`]: {
      justifyContent: 'center'
    },
    [`& .${c['columnHeader--alignRight']} .${c.columnHeaderDraggableContainer}, & .${c['columnHeader--alignRight']} .${c.columnHeaderTitleContainer}`]: {
      flexDirection: 'row-reverse'
    },
    [`& .${c['columnHeader--alignCenter']} .${c.menuIcon}, & .${c['columnHeader--alignRight']} .${c.menuIcon}`]: {
      marginRight: 'auto',
      marginLeft: -6
    },
    [`& .${c['columnHeader--alignRight']} .${c.menuIcon}, & .${c['columnHeader--alignRight']} .${c.menuIcon}`]: {
      marginRight: 'auto',
      marginLeft: -10
    },
    [`& .${c['columnHeader--moving']}`]: {
      backgroundColor: (t.vars || t).palette.action.hover
    },
    [`& .${c['columnHeader--pinnedLeft']}, & .${c['columnHeader--pinnedRight']}`]: {
      position: 'sticky',
      zIndex: 4,
      // Should be above the column separator
      background: 'var(--DataGrid-pinnedBackground)'
    },
    [`& .${c.columnSeparator}`]: {
      visibility: 'hidden',
      position: 'absolute',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: borderColor
    },
    [`& .${c.columnHeaders}`]: {
      width: 'var(--DataGrid-rowWidth)'
    },
    '@media (hover: hover)': {
      [`& .${c.columnHeaders}:hover`]: columnHeadersStyles,
      [`& .${c.columnHeader}:hover`]: columnHeaderStyles,
      [`& .${c.columnHeader}:not(.${c['columnHeader--sorted']}):hover .${c.sortIcon}`]: {
        opacity: 0.5
      }
    },
    '@media (hover: none)': {
      [`& .${c.columnHeaders}`]: columnHeadersStyles,
      [`& .${c.columnHeader}`]: columnHeaderStyles
    },
    [`& .${c['columnSeparator--sideLeft']}`]: {
      left: -12
    },
    [`& .${c['columnSeparator--sideRight']}`]: {
      right: -12
    },
    [`& .${c['columnSeparator--resizable']}`]: {
      cursor: 'col-resize',
      touchAction: 'none',
      '&:hover': {
        color: (t.vars || t).palette.text.primary,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          color: borderColor
        }
      },
      [`&.${c['columnSeparator--resizing']}`]: {
        color: (t.vars || t).palette.text.primary
      },
      '& svg': {
        pointerEvents: 'none'
      }
    },
    [`& .${c.iconSeparator}`]: {
      color: 'inherit'
    },
    [`& .${c.menuIcon}`]: {
      width: 0,
      visibility: 'hidden',
      fontSize: 20,
      marginRight: -10,
      display: 'flex',
      alignItems: 'center'
    },
    [`.${c.menuOpen}`]: {
      visibility: 'visible',
      width: 'auto'
    },
    [`& .${c.headerFilterRow}`]: {
      [`& .${c.columnHeader}`]: {
        boxSizing: 'border-box',
        borderTop: '1px solid var(--DataGrid-rowBorderColor)'
      }
    },
    /* Row styles */
    [`.${c.row}`]: {
      display: 'flex',
      width: 'var(--DataGrid-rowWidth)',
      breakInside: 'avoid',
      // Avoid the row to be broken in two different print pages.

      '--rowBorderColor': 'var(--DataGrid-rowBorderColor)',
      [`&.${c['row--firstVisible']}`]: {
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
    [`& .${c['container--top']}, & .${c['container--bottom']}`]: {
      '[role=row]': {
        background: 'var(--DataGrid-containerBackground)'
      }
    },
    /* Cell styles */
    [`& .${c.cell}`]: {
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
    [`& .${c['virtualScrollerContent--overflowed']} .${c['row--lastVisible']} .${c.cell}`]: {
      borderTopColor: 'transparent'
    },
    [`&.${c['root--disableUserSelection']} .${c.cell}`]: {
      userSelect: 'none'
    },
    [`& .${c['row--dynamicHeight']} > .${c.cell}`]: {
      whiteSpace: 'initial',
      lineHeight: 'inherit'
    },
    [`& .${c.cellEmpty}`]: {
      padding: 0,
      height: 'unset'
    },
    [`& .${c.cell}.${c['cell--selectionMode']}`]: {
      cursor: 'default'
    },
    [`& .${c.cell}.${c['cell--editing']}`]: {
      padding: 1,
      display: 'flex',
      boxShadow: t.shadows[2],
      backgroundColor: (t.vars || t).palette.background.paper,
      '&:focus-within': {
        outline: `solid ${(t.vars || t).palette.primary.main} 1px`,
        outlineOffset: '-1px'
      }
    },
    [`& .${c['row--editing']}`]: {
      boxShadow: t.shadows[2]
    },
    [`& .${c['row--editing']} .${c.cell}`]: {
      boxShadow: t.shadows[0],
      backgroundColor: (t.vars || t).palette.background.paper
    },
    [`& .${c.editBooleanCell}`]: {
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    [`& .${c.booleanCell}[data-value="true"]`]: {
      color: (t.vars || t).palette.text.secondary
    },
    [`& .${c.booleanCell}[data-value="false"]`]: {
      color: (t.vars || t).palette.text.disabled
    },
    [`& .${c.actionsCell}`]: {
      display: 'inline-flex',
      alignItems: 'center',
      gridGap: t.spacing(1)
    },
    [`& .${c.rowReorderCell}`]: {
      display: 'inline-flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: (t.vars || t).palette.action.disabledOpacity
    },
    [`& .${c['rowReorderCell--draggable']}`]: {
      cursor: 'move',
      opacity: 1
    },
    [`& .${c.rowReorderCellContainer}`]: {
      padding: 0,
      display: 'flex',
      alignItems: 'stretch'
    },
    [`.${c.withBorderColor}`]: {
      borderColor
    },
    [`& .${c['cell--withLeftBorder']}, & .${c['columnHeader--withLeftBorder']}`]: {
      borderLeftColor: 'var(--DataGrid-rowBorderColor)',
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid'
    },
    [`& .${c['cell--withRightBorder']}, & .${c['columnHeader--withRightBorder']}`]: {
      borderRightColor: 'var(--DataGrid-rowBorderColor)',
      borderRightWidth: '1px',
      borderRightStyle: 'solid'
    },
    [`& .${c['cell--flex']}`]: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 'inherit'
    },
    [`& .${c['cell--textLeft']}`]: {
      textAlign: 'left',
      justifyContent: 'flex-start'
    },
    [`& .${c['cell--textRight']}`]: {
      textAlign: 'right',
      justifyContent: 'flex-end'
    },
    [`& .${c['cell--textCenter']}`]: {
      textAlign: 'center',
      justifyContent: 'center'
    },
    [`& .${c['cell--pinnedLeft']}, & .${c['cell--pinnedRight']}`]: {
      position: 'sticky',
      zIndex: 3,
      background: 'var(--DataGrid-pinnedBackground)'
    },
    [`& .${c.virtualScrollerContent} .${c.row}`]: {
      '&:hover': {
        [`& .${c['cell--pinnedLeft']}, & .${c['cell--pinnedRight']}`]: {
          backgroundColor: pinnedHoverBackground
        }
      },
      [`&.Mui-selected`]: {
        [`& .${c['cell--pinnedLeft']}, & .${c['cell--pinnedRight']}`]: {
          backgroundColor: pinnedSelectedBackground
        },
        '&:hover': {
          [`& .${c['cell--pinnedLeft']}, & .${c['cell--pinnedRight']}`]: {
            backgroundColor: pinnedSelectedHoverBackground
          }
        }
      }
    },
    [`& .${c.cellOffsetLeft}`]: {
      flex: '0 0 auto',
      display: 'inline-block'
    },
    [`& .${c.cellSkeleton}`]: {
      flex: '0 0 auto',
      height: '100%',
      display: 'inline-flex',
      alignItems: 'center'
    },
    [`& .${c.columnHeaderDraggableContainer}`]: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    [`& .${c.rowReorderCellPlaceholder}`]: {
      display: 'none'
    },
    [`& .${c['columnHeader--dragging']}, & .${c['row--dragging']}`]: {
      background: (t.vars || t).palette.background.paper,
      padding: '0 12px',
      borderRadius: 'var(--unstable_DataGrid-radius)',
      opacity: (t.vars || t).palette.action.disabledOpacity
    },
    [`& .${c['row--dragging']}`]: {
      background: (t.vars || t).palette.background.paper,
      padding: '0 12px',
      borderRadius: 'var(--unstable_DataGrid-radius)',
      opacity: (t.vars || t).palette.action.disabledOpacity,
      [`& .${c.rowReorderCellPlaceholder}`]: {
        display: 'flex'
      }
    },
    [`& .${c.treeDataGroupingCell}`]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    [`& .${c.treeDataGroupingCellToggle}`]: {
      flex: '0 0 28px',
      alignSelf: 'stretch',
      marginRight: t.spacing(2)
    },
    [`& .${c.groupingCriteriaCell}`]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    [`& .${c.groupingCriteriaCellToggle}`]: {
      flex: '0 0 28px',
      alignSelf: 'stretch',
      marginRight: t.spacing(2)
    },
    /* ScrollbarFiller styles */
    [`.${c.scrollbarFiller}`]: {
      minWidth: 'calc(var(--DataGrid-hasScrollY) * var(--DataGrid-scrollbarSize))',
      alignSelf: 'stretch',
      [`&.${c['scrollbarFiller--borderTop']}`]: {
        borderTop: '1px solid var(--DataGrid-rowBorderColor)'
      },
      [`&.${c['scrollbarFiller--pinnedRight']}`]: {
        backgroundColor: 'var(--DataGrid-pinnedBackground)',
        position: 'sticky',
        right: 0
      }
    },
    [`& .${c.filler}`]: {
      flex: 1
    },
    [`& .${c['filler--borderTop']}`]: {
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
  const backgroundColor = decomposeColor(background);
  const overlayColor = decomposeColor(overlay);
  const rgb = [f(backgroundColor.values[0], overlayColor.values[0]), f(backgroundColor.values[1], overlayColor.values[1]), f(backgroundColor.values[2], overlayColor.values[2])];
  return recomposeColor({
    type: 'rgb',
    values: rgb
  });
}