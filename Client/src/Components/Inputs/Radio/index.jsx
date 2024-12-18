import PropTypes from "prop-types";
import { FormControlLabel, Radio as MUIRadio, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import RadioChecked from "../../../assets/icons/radio-checked.svg?react";
import "./index.css";

/**
 * Radio component.
 *
 * @component
 * @example
 * // Usage:
 * <Radio
 *   title="Radio Button Title"
 *   desc="Radio Button Description"
 *   size="small"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the radio button.
 * @param {string} props.title - The title of the radio button.
 * @param {string} [props.desc] - The description of the radio button.
 * @param {string} [props.size="small"] - The size of the radio button.
 * @returns {JSX.Element} - The rendered Radio component.
 */

const Radio = (props) => {
  const theme = useTheme();
  const borderColor = theme.palette.mode === "dark"
    ? theme.palette.grey[400]
    : theme.palette.grey[500]; // Use a lighter shade for light mode

  return (
    <FormControlLabel
      className="custom-radio-button"
      checked={props.checked}
      value={props.value}
      control={
        <MUIRadio
          id={props.id}
          size={props.size}
          checkedIcon={<RadioChecked />}
          sx={{
            color: "transparent",
            width: 16,
            height: 16,
            borderColor: borderColor, // Dynamic border color
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "50%", // Ensure circular shape
            mt: theme.spacing(0.5),
            "&.Mui-checked": {
              borderColor: theme.palette.primary.main, // Highlight when checked
            },
          }}
        />
      }
      onChange={props.onChange}
      label={
        <>
          <Typography component="p">{props.title}</Typography>
          <Typography
            component="h6"
            mt={theme.spacing(1)}
            color={theme.palette.text.secondary}
          >
            {props.desc}
          </Typography>
        </>
      }
      labelPlacement="end"
      sx={{
        alignItems: "flex-start",
        p: theme.spacing(2.5),
        m: theme.spacing(-2.5),
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
          backgroundColor: theme.palette.background.accent,
        },
        "& .MuiButtonBase-root": {
          p: 0,
          mr: theme.spacing(6),
        },
      }}
    />
  );
};

Radio.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  size: PropTypes.string,
};

export default Radio;
