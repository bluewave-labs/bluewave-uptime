import { Avatar as MuiAvatar } from "@mui/material";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {string} props.src - Path to image for avatar
 * @param {string} props.firstName - The users first name
 * @param {string} props.lastName - The users last name
 * @param {boolean} props.small - Specifies if avatar should be large
 * @param {Object} [props.sx] - Additional styles to apply to the button.
 * @returns {JSX.Element}
 * @example
 * // Render a red label
 * <Avatar src="assets/img" first="Alex" last="Holliday" small />
 */

const Avatar = ({ src, firstName, lastName, small, sx }) => {
  const borderColor = "#F0F2F4";
  const smallStyle = small ? { width: 32, height: 32 } : {};
  return (
    <MuiAvatar
      alt={`${firstName} ${lastName}`}
      src={src}
      sx={{
        display: "inline-flex",
        border: `0.2rem solid ${borderColor}`,
        ...smallStyle,
        ...sx
      }}
    >
      {src === undefined ? `${firstName[0]}${lastName[0]}` : null}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  small: PropTypes.bool,
  sx: PropTypes.object,
};

export default Avatar;
