import { useTheme } from "@emotion/react";
import { MenuItem, Select as MuiSelect } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./index.css";

const Select = ({ id, placeholder, isHidden, value, items, onChange, sx }) => {
  const theme = useTheme();
  const itemStyles = {
    fontSize: "var(--env-var-font-size-medium)",
    color: theme.palette.otherColors.bluishGray,
    textTransform: "capitalize",
    borderRadius: `${theme.shape.borderRadius}px`,
    margin: theme.gap.xs,
  };

  return (
    <MuiSelect
      id={id}
      className="select-component"
      value={value}
      onChange={onChange}
      displayEmpty
      MenuProps={{
        PaperProps: {
          style: {
            marginTop: theme.gap.xs,
          },
        },
        MenuListProps: {
          style: { padding: 0 },
        },
      }}
      IconComponent={KeyboardArrowDownIcon}
      sx={{ ...sx }}
    >
      {placeholder && (
        <MenuItem
          className="select-placeholder"
          value="0"
          sx={{
            display: isHidden ? "none" : "flex",
            visibility: isHidden ? "none" : "visible",
            ...itemStyles,
          }}
        >
          {placeholder}
        </MenuItem>
      )}
      {items.map((item) => (
        <MenuItem
          value={item._id}
          key={`${id}-${item._id}`}
          sx={{
            ...itemStyles,
          }}
        >
          {item.name}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
