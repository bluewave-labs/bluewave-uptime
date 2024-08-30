import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import Skeleton from "../../assets/Images/create-placeholder.svg?react";
import Background from "../../assets/Images/background-grid.svg?react";
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

const Fallback = ({ title, checks, link = "/", isAdmin }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      className={`fallback__${title.trim().split(" ")[0]}`}
      alignItems="center"
      gap={theme.spacing(20)}
    >
      <Skeleton style={{ zIndex: 1 }} />
      <Box
        className="background-pattern-svg"
        sx={{
          "& svg g g:last-of-type path": {
            stroke: theme.palette.border.light,
          },
        }}
      >
        <Background style={{ width: "100%" }} />
      </Box>
      <Stack gap={theme.spacing(4)} maxWidth={"275px"} zIndex={1}>
        <Typography
          component="h1"
          marginY={theme.spacing(4)}
          color={theme.palette.text.secondary}
        >
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
      {/* TODO - display a different fallback if user is not an admin*/}
      {isAdmin && (
        <Button
          level="primary"
          label={`Let's create your ${title}`}
          sx={{ alignSelf: "center" }}
          onClick={() => navigate(link)}
        />
      )}
    </Stack>
  );
};

Fallback.propTypes = {
  title: PropTypes.string.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default Fallback;
