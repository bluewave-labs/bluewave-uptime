import { useTheme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import Skeleton from "../../assets/Images/create-placeholder.svg?react";
import Button from "../Button";
import Check from "../Check/Check";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Fallback = ({ title, checks, link = "/" }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      className={`fallback__${title.trim().split(" ")[0]}`}
      gap={theme.gap.xl}
    >
      <Skeleton />
      <Stack gap={theme.gap.small}>
        <Typography
          component="h1"
          marginY={theme.gap.medium}
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
      <Button
        level="primary"
        label={`Let's create your ${title}`}
        sx={{ alignSelf: "center" }}
        onClick={() => navigate(link)}
      />
    </Stack>
  );
};

export default Fallback;
