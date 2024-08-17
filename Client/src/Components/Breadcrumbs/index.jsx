import PropTypes from "prop-types";
import { Box, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import ArrowRight from "../../assets/icons/right-arrow.svg?react";

import "./index.css";

/**
 * Breadcrumbs component that displays a list of breadcrumb items.
 *
 * @param {Object} props
 * @param {Array} props.list - Array of breadcrumb items. Each item should have `name` and `path` properties.
 * @param {string} props.list.name - The name to display for the breadcrumb.
 * @param {string} props.list.path - The path to navigate to when the breadcrumb is clicked.
 *
 * @returns {JSX.Element} The rendered Breadcrumbs component.
 */

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

Breadcrumbs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Breadcrumbs;
