import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import CheckboxOutline from "../../../assets/icons/checkbox-outline.svg?react";
import CheckboxFilled from "../../../assets/icons/checkbox-filled.svg?react";

import "./index.css";

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

export default Checkbox;
