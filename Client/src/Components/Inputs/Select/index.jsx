import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { MenuItem, Select as MuiSelect } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./index.css";

/**
 * @component
 * @param {object} props
 * @param {string} props.id - The ID attribute for the select element.
 * @param {string} props.placeholder - The placeholder text when no option is selected.
 * @param {boolean} props.isHidden - Whether the placeholder should be hidden.
 * @param {string} props.value - The currently selected value.
 * @param {object[]} props.items - The array of items to populate in the select dropdown.
 *    @param {string} props.items._id - The unique identifier of each item.
 *    @param {string} props.items.name - The display name of each item.
 * @param {function} props.onChange - The function to handle onChange event.
 * @param {object} props.sx - The custom styles object for MUI Select component.
 * @returns {JSX.Element}
 */

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

Select.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isHidden: PropTypes.bool,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default Select;
