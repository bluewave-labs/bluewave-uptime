import _extends from "@babel/runtime/helpers/esm/extends";
import MUICheckbox from '@mui/material/Checkbox';
import MUITextField from '@mui/material/TextField';
import MUIFormControl from '@mui/material/FormControl';
import MUISelect from '@mui/material/Select';
import MUIButton from '@mui/material/Button';
import MUIIconButton from '@mui/material/IconButton';
import MUIInputAdornment from '@mui/material/InputAdornment';
import MUITooltip from '@mui/material/Tooltip';
import MUIPopper from '@mui/material/Popper';
import MUIInputLabel from '@mui/material/InputLabel';
import MUIChip from '@mui/material/Chip';
import { GridColumnUnsortedIcon } from './icons/GridColumnUnsortedIcon';
import { GridAddIcon, GridArrowDownwardIcon, GridArrowUpwardIcon, GridCheckIcon, GridCloseIcon, GridColumnIcon, GridDragIcon, GridExpandMoreIcon, GridFilterAltIcon, GridFilterListIcon, GridKeyboardArrowRight, GridMoreVertIcon, GridRemoveIcon, GridSaveAltIcon, GridSearchIcon, GridSeparatorIcon, GridTableRowsIcon, GridTripleDotsVerticalIcon, GridViewHeadlineIcon, GridViewStreamIcon, GridVisibilityOffIcon, GridViewColumnIcon, GridClearIcon, GridLoadIcon, GridDeleteForeverIcon } from './icons';
import MUISelectOption from './components/MUISelectOption';
const iconSlots = {
  booleanCellTrueIcon: GridCheckIcon,
  booleanCellFalseIcon: GridCloseIcon,
  columnMenuIcon: GridTripleDotsVerticalIcon,
  openFilterButtonIcon: GridFilterListIcon,
  filterPanelDeleteIcon: GridCloseIcon,
  columnFilteredIcon: GridFilterAltIcon,
  columnSelectorIcon: GridColumnIcon,
  columnUnsortedIcon: GridColumnUnsortedIcon,
  columnSortedAscendingIcon: GridArrowUpwardIcon,
  columnSortedDescendingIcon: GridArrowDownwardIcon,
  columnResizeIcon: GridSeparatorIcon,
  densityCompactIcon: GridViewHeadlineIcon,
  densityStandardIcon: GridTableRowsIcon,
  densityComfortableIcon: GridViewStreamIcon,
  exportIcon: GridSaveAltIcon,
  moreActionsIcon: GridMoreVertIcon,
  treeDataCollapseIcon: GridExpandMoreIcon,
  treeDataExpandIcon: GridKeyboardArrowRight,
  groupingCriteriaCollapseIcon: GridExpandMoreIcon,
  groupingCriteriaExpandIcon: GridKeyboardArrowRight,
  detailPanelExpandIcon: GridAddIcon,
  detailPanelCollapseIcon: GridRemoveIcon,
  rowReorderIcon: GridDragIcon,
  quickFilterIcon: GridSearchIcon,
  quickFilterClearIcon: GridCloseIcon,
  columnMenuHideIcon: GridVisibilityOffIcon,
  columnMenuSortAscendingIcon: GridArrowUpwardIcon,
  columnMenuSortDescendingIcon: GridArrowDownwardIcon,
  columnMenuFilterIcon: GridFilterAltIcon,
  columnMenuManageColumnsIcon: GridViewColumnIcon,
  columnMenuClearIcon: GridClearIcon,
  loadIcon: GridLoadIcon,
  filterPanelAddIcon: GridAddIcon,
  filterPanelRemoveAllIcon: GridDeleteForeverIcon,
  columnReorderIcon: GridDragIcon
};
const materialSlots = _extends({}, iconSlots, {
  baseCheckbox: MUICheckbox,
  baseTextField: MUITextField,
  baseFormControl: MUIFormControl,
  baseSelect: MUISelect,
  baseButton: MUIButton,
  baseIconButton: MUIIconButton,
  baseInputAdornment: MUIInputAdornment,
  baseTooltip: MUITooltip,
  basePopper: MUIPopper,
  baseInputLabel: MUIInputLabel,
  baseSelectOption: MUISelectOption,
  baseChip: MUIChip
});
export default materialSlots;