import Button from "../../Components/Button";
import "./index.css";
import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

/**
 * Support for defaultProps will be removed from function components in a future major release
 * So That why we're using JavaScript default parameters instead.
 */
const DefaultValue = {
  title: "We cannot find this page",
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
 * @param {string} [props.title="We cannot find this page"] - The title of the error page.
 * @param {string} [props.desc="Either the URL doesn’t exist, or you don’t have access to it."] - The description of the error page.
 * @returns {JSX.Element} The rendered error page component.
 */
const NotFound = ({ title = DefaultValue.title, desc = DefaultValue.desc }) => {
  const navigate = useNavigate();

  return (
    <Stack className="not-found-page" justifyContent="center">
      <Stack gap="20px" alignItems="center">
        <Typography component="h1">{title}</Typography>
        <Typography>{desc}</Typography>
        <Button
          label="Go to the main dashboard"
          level="primary"
          sx={{ mt: "24px" }}
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
