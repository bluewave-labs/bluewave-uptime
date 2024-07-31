import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

const levelConfig = {
  primary: {
    variant: "contained",
    color: "primary",
  },
  secondary: {
    variant: "outlined",
    color: "secondary",
  },
  tertiary: {
    variant: "text",
    color: "tertiary",
  },
  error: {
    variant: "contained",
    color: "error",
  },
};

/**
 * @component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'error'} props.level - The style level of the button.
 * @param {string} props.label - The label text displayed on the button.
 * @param {React.ReactNode} [props.img] - Icon or image element to display within the button.
 * @param {boolean} [props.disabled=false] - Determines if the button is disabled.
 * @param {string} [props.loadingText] - Text displayed when the button is in a loading state.
 * @param {'start' | 'end'} [props.position] - Specifies where the icon or loading loadingText should be positioned relative to the label.
 * @param {function} props.onClick - Callback function invoked when the button is clicked.
 * @param {boolean} props.isLoading - Indicates if the button is in a loading state.
 * @param {Object} [props.sx] - Additional styles to apply to the button.
 * @returns {JSX.Element}
 * @example
 * // Render a primary button with an icon at the end
 * <ButtonSpinner
 *   level="primary"
 *   label="Save"
 *   img={<SaveIcon />}
 *   position="end"
 *   onClick={handleSaveClick}
 *   isLoading={loading}
 * />
 */

const ButtonSpinner = ({
  level,
  label,
  disabled,
  loadingText,
  position,
  img,
  onClick,
  isLoading,
  sx,
}) => {
  const { variant, color } = levelConfig[level];
  //if both a loadingPosition and loadingIndicator are provided, the spinner overlaps with the text and it breaks
  if (position && loadingText) loadingText = null;
  return (
    <LoadingButton
      variant={variant}
      color={color}
      disabled={disabled}
      loadingIndicator={loadingText}
      loadingPosition={position}
      startIcon={position === "start" && img}
      endIcon={position === "end" && img}
      onClick={onClick}
      loading={isLoading}
      disableRipple
      sx={{
        boxShadow: "none",
        textTransform: "none",
        "&:focus": {
          outline: "none",
        },
        "&:hover": {
          boxShadow: "none",
          transition: "none"
        },
        ...sx,
      }}
    >
      <span>{label}</span>
    </LoadingButton>
  );
};

ButtonSpinner.propTypes = {
  level: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  position: PropTypes.oneOf(["start", "end"]),
  img: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  disabled: PropTypes.bool,
};

export default ButtonSpinner;
