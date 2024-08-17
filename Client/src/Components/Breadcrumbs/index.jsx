import { Box, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import ArrowRight from "../../assets/icons/right-arrow.svg?react";

import "./index.css";

const Breadcrumbs = ({ list }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MUIBreadcrumbs
      separator={<ArrowRight />}
      aria-label="breadcrumb"
      p={theme.gap.small}
      width="fit-content"
      backgroundColor={theme.palette.otherColors.fillGray}
      borderRadius={`${theme.shape.borderRadius}px`}
      lineHeight="18px"
    >
      {list.map((item, index) => {
        return (
          <Box
            component="a"
            key={`${item.name}-${index}`}
            px={theme.gap.small}
            pt={theme.gap.xs}
            pb="6px"
            sx={{ textTransform: "capitalize" }}
            borderRadius={`${theme.shape.borderRadius}px`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </Box>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
