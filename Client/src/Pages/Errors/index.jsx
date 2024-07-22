import Button from "../../Components/Button";
import "./index.css";
import React from "react";
import PropTypes from "prop-types";

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
const ErrorPage = ({
  title = DefaultValue.title,
  desc = DefaultValue.desc,
}) => {
  return (
    <div className="error-page">
      <div className="error-template">
        <div className="error-title">{title}</div>
        <div className="error-page-gap-medium"></div>
        <div className="error-description">{desc}</div>
        <div className="error-page-gap-xlarge"></div>
        <div
          className="button-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            label="Go to the main dashboard"
            level="primary"
            id="error-page-action"
            sx={{ fontSize: "var(--env-var-font-size-medium)" }}
          />
        </div>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default ErrorPage;
