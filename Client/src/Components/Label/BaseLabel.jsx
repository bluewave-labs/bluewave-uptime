import PropTypes from "prop-types";
import "./BaseLabel.css";
import { useTheme } from "@mui/material";

// Produces a lighter color based on a hex color and a percent
// lightenColor("#067647", 20) will produce a color 20% lighter than #067647
const lightenColor = (color, percent) => {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  const amt = Math.round((255 * percent) / 100);

  r = r + amt <= 255 ? r + amt : 255;
  g = g + amt <= 255 ? g + amt : 255;
  b = b + amt <= 255 ? b + amt : 255;

  r = r.toString(16).padStart(2, "0");
  g = g.toString(16).padStart(2, "0");
  b = b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};

/**
 * @typedef {Object} Props
 * @property {string} label - The label of the button
 * @property {string} color - The base color of the label
 */

const Label = ({ label, color }) => {
  const theme = useTheme();

  // If an invalid color is passed, default to the labelGray color
  if (
    typeof color !== "string" ||
    !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)
  ) {
    color = theme.palette.labelGray.textColor;
    console.log(color);
  }

  // Calculate lighter shades for border and bg
  const borderColor = lightenColor(color, 20);
  const bgColor = lightenColor(color, 75);
  // Grab the default borderRadius from the theme to match button style
  const { borderRadius } = theme.shape;
  // Calculate padding for the label to mimic button.  Appears to scale correctly, not 100% sure though.
  const padding = theme.spacing(1 * 0.75, 2);

  return (
    <div
      className="label"
      style={{
        borderRadius: borderRadius,
        borderColor: borderColor,
        backgroundColor: bgColor,
        color: color,
        padding: padding,
      }}
    >
      {label}
    </div>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Label;
