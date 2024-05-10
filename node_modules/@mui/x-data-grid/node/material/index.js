"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _Popper = _interopRequireDefault(require("@mui/material/Popper"));
var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));
var _Chip = _interopRequireDefault(require("@mui/material/Chip"));
var _GridColumnUnsortedIcon = require("./icons/GridColumnUnsortedIcon");
var _icons = require("./icons");
var _MUISelectOption = _interopRequireDefault(require("./components/MUISelectOption"));
const iconSlots = {
  booleanCellTrueIcon: _icons.GridCheckIcon,
  booleanCellFalseIcon: _icons.GridCloseIcon,
  columnMenuIcon: _icons.GridTripleDotsVerticalIcon,
  openFilterButtonIcon: _icons.GridFilterListIcon,
  filterPanelDeleteIcon: _icons.GridCloseIcon,
  columnFilteredIcon: _icons.GridFilterAltIcon,
  columnSelectorIcon: _icons.GridColumnIcon,
  columnUnsortedIcon: _GridColumnUnsortedIcon.GridColumnUnsortedIcon,
  columnSortedAscendingIcon: _icons.GridArrowUpwardIcon,
  columnSortedDescendingIcon: _icons.GridArrowDownwardIcon,
  columnResizeIcon: _icons.GridSeparatorIcon,
  densityCompactIcon: _icons.GridViewHeadlineIcon,
  densityStandardIcon: _icons.GridTableRowsIcon,
  densityComfortableIcon: _icons.GridViewStreamIcon,
  exportIcon: _icons.GridSaveAltIcon,
  moreActionsIcon: _icons.GridMoreVertIcon,
  treeDataCollapseIcon: _icons.GridExpandMoreIcon,
  treeDataExpandIcon: _icons.GridKeyboardArrowRight,
  groupingCriteriaCollapseIcon: _icons.GridExpandMoreIcon,
  groupingCriteriaExpandIcon: _icons.GridKeyboardArrowRight,
  detailPanelExpandIcon: _icons.GridAddIcon,
  detailPanelCollapseIcon: _icons.GridRemoveIcon,
  rowReorderIcon: _icons.GridDragIcon,
  quickFilterIcon: _icons.GridSearchIcon,
  quickFilterClearIcon: _icons.GridCloseIcon,
  columnMenuHideIcon: _icons.GridVisibilityOffIcon,
  columnMenuSortAscendingIcon: _icons.GridArrowUpwardIcon,
  columnMenuSortDescendingIcon: _icons.GridArrowDownwardIcon,
  columnMenuFilterIcon: _icons.GridFilterAltIcon,
  columnMenuManageColumnsIcon: _icons.GridViewColumnIcon,
  columnMenuClearIcon: _icons.GridClearIcon,
  loadIcon: _icons.GridLoadIcon,
  filterPanelAddIcon: _icons.GridAddIcon,
  filterPanelRemoveAllIcon: _icons.GridDeleteForeverIcon,
  columnReorderIcon: _icons.GridDragIcon
};
const materialSlots = (0, _extends2.default)({}, iconSlots, {
  baseCheckbox: _Checkbox.default,
  baseTextField: _TextField.default,
  baseFormControl: _FormControl.default,
  baseSelect: _Select.default,
  baseButton: _Button.default,
  baseIconButton: _IconButton.default,
  baseInputAdornment: _InputAdornment.default,
  baseTooltip: _Tooltip.default,
  basePopper: _Popper.default,
  baseInputLabel: _InputLabel.default,
  baseSelectOption: _MUISelectOption.default,
  baseChip: _Chip.default
});
var _default = exports.default = materialSlots;