import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  MenuItem,
  Select as MuiSelect,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./index.css";

/**
 * @component
 * @param {object} props
 * @param {string} props.id - The ID attribute for the select element.
 * @param {string} props.placeholder - The label of the select element.
 * @param {string} props.placeholder - The placeholder text when no option is selected.
 * @param {boolean} props.isHidden - Whether the placeholder should be hidden.
 * @param {string} props.value - The currently selected value.
 * @param {object[]} props.items - The array of items to populate in the select dropdown.
 *    @param {(string | number)} props.items._id - The unique identifier of each item.
 *    @param {string} props.items.name - The display name of each item.
 * @param {function} props.onChange - The function to handle onChange event.
 * @param {object} props.sx - The custom styles object for MUI Select component.
 * @returns {JSX.Element}
 *
 * @example
 * const frequencies = [
 * { _id: 1, name: "1 minute" },
 * { _id: 2, name: "2 minutes" },
 * { _id: 3, name: "3 minutes" },
 * ];
 *
 * <Select
 *  id="frequency-id"
 *  label="Check frequency"
 *  placeholder="Select frequency"
 *  value={value}
 *  onChange={handleChange}
 *  items={frequencies}
 * />
 */

const Select = ({
  id,
  label,
  placeholder,
  isHidden,
  value,
  items,
  onChange,
  sx,
}) => {
  const theme = useTheme();
  const itemStyles = {
    fontSize: "var(--env-var-font-size-medium)",
    color: theme.palette.otherColors.bluishGray,
    textTransform: "capitalize",
    borderRadius: `${theme.shape.borderRadius}px`,
    margin: theme.gap.xs,
  };

  return (
    <Stack gap={theme.gap.xs} className="select-wrapper">
      {label && <Typography component="h3">{label}</Typography>}
      <MuiSelect
        className="select-component"
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ id: id }}
        MenuProps={{
          PaperProps: {
            className: "select-dropdown",
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
    </Stack>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isHidden: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default Select;
