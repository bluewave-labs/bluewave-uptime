import { Avatar as MuiAvatar } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/**
 * Generates a color based on the input string.
 * @param {string} string - The input string to generate the color from.
 * @returns {string}
 */
const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

/**
 * @component
 * @param {Object} props
 * @param {string} props.src - Path to image for avatar
 * @param {boolean} props.small - Specifies if avatar should be large
 * @param {Object} [props.sx] - Additional styles to apply to the button.
 * @returns {JSX.Element}
 * @example
 * // Render a red label
 * <Avatar src="assets/img" first="Alex" last="Holliday" small />
 */

const Avatar = ({ src, small, sx }) => {
  const { user } = useSelector((state) => state.auth);

  const style = small ? { width: 32, height: 32 } : { width: 64, height: 64 };
  const border = small ? 1 : 3;

  const [image, setImage] = useState();
  useEffect(() => {
    if (user.avatarImage) {
      setImage(`data:image/png;base64,${user.avatarImage}`);
    }
  }, [user?.avatarImage]);

  return (
    <MuiAvatar
      alt={`${user?.firstName} ${user?.lastName}`}
      src={
        src ? src : user?.avatarImage ? image : "/static/images/avatar/2.jpg"
      }
      sx={{
        fontSize: small ? "16px" : "22px",
        fontWeight: 400,
        backgroundColor: stringToColor(`${user?.firstName} ${user?.lastName}`),
        display: "inline-flex",
        "&::before": {
          content: `""`,
          position: "absolute",
          top: "0",
          left: "0",
          width: `calc(100% - ${border * 2}px)`,
          height: `calc(100% - ${border * 2}px)`,
          border: `${border}px solid rgba(255,255,255,0.2)`,
          borderRadius: "50%",
        },
        ...style,
        ...sx,
      }}
    >
      {user.firstName?.charAt(0)}
      {user.lastName?.charAt(0)}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  small: PropTypes.bool,
  sx: PropTypes.object,
};

export default Avatar;
