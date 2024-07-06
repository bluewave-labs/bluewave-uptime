/**
 * RadioButton component.
 *
 * @component
 * @example
 * // Usage:
 * <RadioButton
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
 * @returns {JSX.Element} - The rendered RadioButton component.
 */

import PropTypes from "prop-types";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./index.css";

function RadioButton(props) {
  const theme = useTheme();
  return (
    <FormControlLabel
      className="custom-radio-button"
      checked={props.checked}
      value={props.value}
      control={
        <Radio
          id={props.id}
          size={props.size}
          sx={{ color: theme.palette.secondary.main }}
        />
      }
      onChange={props.onChange}
      label={
        <>
          <Typography component="p">{props.title}</Typography>
          <Typography component="h6" mt="2px">
            {props.desc}
          </Typography>
        </>
      }
      labelPlacement="end"
      sx={{ margin: 0, alignItems: "flex-start" }}
    />
  );
}

RadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  size: PropTypes.string,
};

export default RadioButton;
