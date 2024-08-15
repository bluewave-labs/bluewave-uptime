import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import Skeleton from "../../assets/Images/create-placeholder.svg?react";
import background from "../../assets/Images/background_pattern_decorative.png";
import Button from "../Button";
import Check from "../Check/Check";
import { useNavigate } from "react-router-dom";
import "./index.css";

/**
 * Fallback component to display a fallback UI with a title, a list of checks, and a navigation button.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the fallback UI.
 * @param {Array<string>} props.checks - An array of strings representing the checks to display.
 * @param {string} [props.link="/"] - The link to navigate to.
 *
 * @returns {JSX.Element} The rendered fallback UI.
 */

const Fallback = ({ title, checks, link = "/" }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      className={`fallback__${title.trim().split(" ")[0]}`}
      alignItems="center"
      gap={theme.gap.xl}
    >
      <Skeleton style={{ zIndex: 1 }} />
      <Box
        className="background-pattern-svg"
        sx={{ backgroundImage: `url(${background})` }}
      />
      <Stack gap={theme.gap.small} maxWidth={"275px"} zIndex={1}>
        <Typography component="h1" marginY={theme.gap.medium}>
          A {title} is used to:
        </Typography>
        {checks.map((check, index) => (
          <Check
            text={check}
            key={`${title.trim().split(" ")[0]}-${index}`}
            outlined={true}
          />
        ))}
      </Stack>
      <Button
        level="primary"
        label={`Let's create your ${title}`}
        sx={{ alignSelf: "center" }}
        onClick={() => navigate(link)}
      />
    </Stack>
  );
};

Fallback.propTypes = {
  title: PropTypes.string.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string,
};

export default Fallback;
