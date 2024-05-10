import * as React from 'react';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { TextFieldProps } from '@mui/material/TextField';
import type { FormControlProps } from '@mui/material/FormControl';
import type { SelectProps } from '@mui/material/Select';
import type { SwitchProps } from '@mui/material/Switch';
import type { ButtonProps } from '@mui/material/Button';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { InputAdornmentProps } from '@mui/material/InputAdornment';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { InputLabelProps } from '@mui/material/InputLabel';
import type { PopperProps } from '@mui/material/Popper';
import type { TablePaginationProps } from '@mui/material/TablePagination';
import type { ChipProps } from '@mui/material/Chip';
import type { GridToolbarProps } from '../components/toolbar/GridToolbar';
import type { ColumnHeaderFilterIconButtonProps } from '../components/columnHeaders/GridColumnHeaderFilterIconButton';
import type { GridColumnMenuProps } from '../components/menu/columnMenu/GridColumnMenuProps';
import type { GridColumnsPanelProps } from '../components/panel/GridColumnsPanel';
import type { GridFilterPanelProps } from '../components/panel/filterPanel/GridFilterPanel';
import type { GridFooterContainerProps } from '../components/containers/GridFooterContainer';
import type { GridOverlayProps } from '../components/containers/GridOverlay';
import type { GridPanelProps } from '../components/panel/GridPanel';
import type { GridSkeletonCellProps } from '../components/cell/GridSkeletonCell';
import type { GridRowProps } from '../components/GridRow';
import type { GridCellProps } from '../components/cell/GridCell';
import type { GridColumnHeadersProps } from '../components/GridColumnHeaders';
import type { GridDetailPanelsProps } from '../components/GridDetailPanels';
import type { GridPinnedRowsProps } from '../components/GridPinnedRows';
import type { GridColumnsManagementProps } from '../components/columnsManagement/GridColumnsManagement';
import type { GridRowCountProps } from '../components';
export interface BaseCheckboxPropsOverrides {
}
export interface BaseTextFieldPropsOverrides {
}
export interface BaseFormControlPropsOverrides {
}
export interface BaseSelectPropsOverrides {
}
export interface BaseSwitchPropsOverrides {
}
export interface BaseButtonPropsOverrides {
}
export interface BaseIconButtonPropsOverrides {
}
export interface BaseInputAdornmentPropsOverrides {
}
export interface BaseTooltipPropsOverrides {
}
export interface BasePopperPropsOverrides {
}
export interface BaseInputLabelPropsOverrides {
}
export interface BaseSelectOptionPropsOverrides {
}
export interface BaseChipPropsOverrides {
}
export interface CellPropsOverrides {
}
export interface ToolbarPropsOverrides {
}
export interface ColumnHeaderFilterIconButtonPropsOverrides {
}
export interface ColumnMenuPropsOverrides {
}
export interface ColumnsPanelPropsOverrides {
}
export interface DetailPanelsPropsOverrides {
}
export interface ColumnsManagementPropsOverrides {
}
export interface FilterPanelPropsOverrides {
}
export interface FooterPropsOverrides {
}
export interface FooterRowCountOverrides {
}
export interface PaginationPropsOverrides {
}
export interface LoadingOverlayPropsOverrides {
}
export interface NoResultsOverlayPropsOverrides {
}
export interface NoRowsOverlayPropsOverrides {
}
export interface PanelPropsOverrides {
}
export interface PinnedRowsPropsOverrides {
}
export interface SkeletonCellPropsOverrides {
}
export interface RowPropsOverrides {
}
export interface GridSlotProps {
    baseCheckbox: CheckboxProps & BaseCheckboxPropsOverrides;
    baseTextField: TextFieldProps & BaseTextFieldPropsOverrides;
    baseFormControl: FormControlProps & BaseFormControlPropsOverrides;
    baseSelect: SelectProps & BaseSelectPropsOverrides;
    baseSwitch: SwitchProps & BaseSwitchPropsOverrides;
    baseButton: ButtonProps & BaseButtonPropsOverrides;
    baseIconButton: IconButtonProps & BaseIconButtonPropsOverrides;
    basePopper: PopperProps & BasePopperPropsOverrides;
    baseTooltip: TooltipProps & BaseTooltipPropsOverrides;
    baseInputLabel: InputLabelProps & BaseInputLabelPropsOverrides;
    baseInputAdornment: InputAdornmentProps & BaseInputAdornmentPropsOverrides;
    baseSelectOption: {
        native: boolean;
        value: any;
        children?: React.ReactNode;
    } & BaseSelectOptionPropsOverrides;
    baseChip: ChipProps & BaseChipPropsOverrides;
    cell: GridCellProps & CellPropsOverrides;
    columnHeaders: GridColumnHeadersProps;
    columnHeaderFilterIconButton: ColumnHeaderFilterIconButtonProps & ColumnHeaderFilterIconButtonPropsOverrides;
    columnMenu: GridColumnMenuProps & ColumnMenuPropsOverrides;
    columnsPanel: GridColumnsPanelProps & ColumnsPanelPropsOverrides;
    columnsManagement: GridColumnsManagementProps & ColumnsManagementPropsOverrides;
    detailPanels: GridDetailPanelsProps & DetailPanelsPropsOverrides;
    filterPanel: GridFilterPanelProps & FilterPanelPropsOverrides;
    footer: GridFooterContainerProps & FooterPropsOverrides;
    footerRowCount: GridRowCountProps & FooterRowCountOverrides;
    loadingOverlay: GridOverlayProps & LoadingOverlayPropsOverrides;
    noResultsOverlay: GridOverlayProps & NoResultsOverlayPropsOverrides;
    noRowsOverlay: GridOverlayProps & NoRowsOverlayPropsOverrides;
    pagination: Partial<TablePaginationProps> & PaginationPropsOverrides;
    panel: GridPanelProps & PanelPropsOverrides;
    pinnedRows: GridPinnedRowsProps & PinnedRowsPropsOverrides;
    row: GridRowProps & RowPropsOverrides;
    skeletonCell: GridSkeletonCellProps & SkeletonCellPropsOverrides;
    toolbar: GridToolbarProps & ToolbarPropsOverrides;
}
/**
 * Overridable components props dynamically passed to the component at rendering.
 */
export type GridSlotsComponentsProps = Partial<{
    [K in keyof GridSlotProps]: Partial<GridSlotProps[K]>;
}>;
