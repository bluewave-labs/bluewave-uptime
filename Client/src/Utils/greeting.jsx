import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

/**
 * Greeting component that displays a personalized greeting message
 * based on the time of day and the user's first name.
 *
 * @component
 * @example
 * return <Greeting type={"pagespeed"} />;
 *
 * @param {Object} props
 * @param {string} props.type - The type of monitor to be displayed in the message
 * @returns {JSX.Element} The rendered Greeting component
 */

const Greeting = ({ type = "" }) => {
  const theme = useTheme();
  const { firstName } = useSelector((state) => state.auth.user);

  const now = new Date();
  const hour = now.getHours();

  let greeting = "";
  let emoji = "";
  if (hour < 12) {
    greeting = "morning";
    emoji = "🌅";
  } else if (hour < 18) {
    greeting = "afternoon";
    emoji = "🌞";
  } else {
    greeting = "evening";
    emoji = "🌙";
  }

  return (
    <Box>
      <Typography
        component="h1"
        lineHeight={1}
        fontWeight={500}
        color={theme.palette.text.primary}
      >
        <Typography
          component="span"
          fontSize="inherit"
          color={theme.palette.text.secondary}
        >
          Good {greeting},{" "}
        </Typography>
        <Typography component="span" fontSize="inherit" fontWeight="inherit">
          {firstName} {emoji}
        </Typography>
      </Typography>
      <Typography
        sx={{ opacity: 0.8 }}
        lineHeight={1}
        fontSize={14}
        fontWeight={300}
        color={theme.palette.text.secondary}
      >
        Here’s an overview of your {type} monitors.
      </Typography>
    </Box>
  );
};

Greeting.propTypes = {
  type: PropTypes.string,
};

export default Greeting;
