import { Avatar as MuiAvatar } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { bufferTo64 } from "../../Utils/fileUtils";

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

  const style = small ? { width: 25, height: 25 } : { width: 64, height: 64 };
  const border = small ? 1 : 3;

  const [image, setImage] = useState();
  useEffect(() => {
    const fetchImage = async () => {
      if (user.profileImage.data && user.profileImage.contentType) {
        try {
          const base64 = await bufferTo64(user.profileImage.data);
          setImage(base64);
        } catch (error) {
          console.error("Error converting buffer to base64:", error);
        }
      }
    };
    fetchImage();
  }, [user]);

  return (
    <MuiAvatar
      alt={`${user?.firstname} ${user?.lastname}`}
      src={
        src === null
          ? "/static/images/avatar/2.jpg"
          : src
          ? src
          : user?.profileImage
          ? image
          : "/static/images/avatar/2.jpg"
      }
      sx={{
        fontSize: small ? "12px" : "20px",
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
      {src === undefined
        ? `${user.firstname?.charAt(0)}${user.lastname?.charAt(0)}`
        : null}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  small: PropTypes.bool,
  sx: PropTypes.object,
};

export default Avatar;
