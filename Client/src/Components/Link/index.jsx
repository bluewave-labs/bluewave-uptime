import { Link as MuiLink, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Link = ({ level, label, url }) => {
  const theme = useTheme();

  const levelConfig = {
    primary: {},
    secondary: {},
    tertiary: {
      color: theme.palette.tertiary.main,
      sx: {
        textDecoration: "underline",
        textDecorationStyle: "dashed",
        textDecorationColor: theme.palette.primary.main,
        ":hover": {
          color: theme.palette.tertiary.main,
          textDecorationColor: theme.palette.primary.main,
          backgroundColor: theme.palette.tertiary.linkHover,
        },
      },
    },
    error: {},
  };

  /**
   * @typedef {Object} Props
   * @property {'primary' | 'secondary' | 'tertiary' | 'error'} level - The level of the link
   * @property {string} label - The label of the link
   * @property {string} url - The URL of the link
   */

  const { sx, color } = levelConfig[level];
  return (
    <MuiLink href={url} sx={sx} color={color}>
      {label}
    </MuiLink>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  level: PropTypes.oneOf(["primary", "secondary", "tertiary", "error"]),
  label: PropTypes.string.isRequired,
};

export default Link;
