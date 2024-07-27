import PropTypes from "prop-types";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import CheckboxOutline from "../../../assets/icons/checkbox-outline.svg?react";
import CheckboxFilled from "../../../assets/icons/checkbox-filled.svg?react";

import "./index.css";

/**
 * @param {Object} props
 * @param {string} props.id - The id attribute for the checkbox input.
 * @param {string} props.label - The label to display next to the checkbox.
 * @param {('small' | 'medium' | 'large')} - The size of the checkbox.
 * @param {boolean} props.isChecked - Whether the checkbox is checked or not.
 * @param {string} [props.value] - The value of the checkbox input.
 * @param {function} [props.onChange] - The function to call when the checkbox value changes.
 * @param {boolean} [props.isDisabled] - Whether the checkbox is disabled or not.
 *
 * @returns {JSX.Element}
 * 
 * @example
 * <Checkbox
 *  id="checkbox-id"
 *  label="Ping monitoring"
 *  isChecked={checks.type === "ping"}
 *  value="ping"
 *  onChange={handleChange}
 * />
 */

const Checkbox = ({
  id,
  label,
  size = "medium",
  isChecked,
  value,
  onChange,
  isDisabled,
}) => {
  const sizes = { small: "14px", medium: "16px", large: "18px" };

  return (
    <FormControlLabel
      className="checkbox-wrapper"
      control={
        <MuiCheckbox
          checked={isDisabled ? false : isChecked}
          value={value}
          onChange={onChange}
          icon={<CheckboxOutline />}
          checkedIcon={<CheckboxFilled />}
          inputProps={{
            "aria-label": "controlled checkbox",
            id: id,
          }}
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            "& svg": { width: sizes[size], height: sizes[size] },
          }}
        />
      }
      label={label}
      disabled={isDisabled}
      sx={{
        p: "5px",
        m: "-5px",
        "& .MuiButtonBase-root": {
          width: "20px",
        },
      }}
    />
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isChecked: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Checkbox;
