import Button from "../../Components/Button";
import React from "react";
import PropTypes from "prop-types";
import NotFoundSvg from "../../../src/assets/Images/sushi_404.svg";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";

/**
 * Support for defaultProps will be removed from function components in a future major release
 * So That why we're using JavaScript default parameters instead.
 */
const DefaultValue = {
  title: "Oh no! You dropped your sushi!",
  desc: "Either the URL doesn’t exist, or you don’t have access to it.",
};

/**
 * Renders an error page component with a customizable title and description.
 *
 * @component
 * @example
 * // Usage:
 * <ErrorPage
 *   title="Page Not Found"
 *   desc="The requested page could not be found."
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} [props.title="Oh no! You dropped your sushi!"] - The title of the error page.
 * @param {string} [props.desc="Either the URL doesn’t exist, or you don’t have access to it."] - The description of the error page.
 * @returns {JSX.Element} The rendered error page component.
 */
const NotFound = ({ title = DefaultValue.title, desc = DefaultValue.desc }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Stack height="100vh" justifyContent="center">
      <Stack
        gap={theme.spacing(2)}
        alignItems="center"
        color={theme.palette.text.secondary}
      >
        <img src={NotFoundSvg} alt="404" style={{ maxHeight: "25rem" }} />
        <Typography component="h1" fontSize={16} fontWeight={600}>
          {title}
        </Typography>
        <Typography fontSize={13}>{desc}</Typography>
        <Button
          label="Go to the main dashboard"
          level="primary"
          sx={{ mt: theme.spacing(10) }}
          onClick={() => navigate("/")}
        />
      </Stack>
    </Stack>
  );
};

NotFound.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default NotFound;
