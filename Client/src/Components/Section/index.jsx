import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  useTheme,
  Typography,
  TextField,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "../Button/";
import AddIcon from "@mui/icons-material/Add";

/**
 * @component
 * @param {Object} props
 * @param { Array} props.montitors - Array of monitors associated with the section
 * @returns {JSX.Element}
 * @example
 * // Renders a section component with a list of monitors
 * <Section monitors={monitors} />
 */

const Section = ({ monitors }) => {
  const [monitorStates, setMonitorStates] = useState(
    monitors.map((monitor) => monitor.isActive)
  );

  useEffect(() => {
    console.log("Monitor states updated", monitorStates);
    // Update DB here
  }, [monitorStates]);

  const handleMonitor = (monitorIndex) => {
    setMonitorStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[monitorIndex] = !newStates[monitorIndex];

      return newStates;
      // Need to update DB with new monitor state
    });
  };
  const theme = useTheme();
  return (
    <>
      <Container
        disableGutters
        sx={{
          border: `1px solid ${theme.palette.section.borderColor}`,
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        <Box
          sx={{
            textAlign: "left",
            padding: `${theme.spacing(2)}`,
            bgcolor: `${theme.palette.section.bgColor}`,
            borderBottom: `1px solid ${theme.palette.section.borderColor}`,
          }}
        >
          <Typography>Section Name</Typography>
          <TextField
            placeholder="Service Name"
            sx={{
              "& input": {
                width: "320px",
                height: "34px",
                padding: "10px 14px 10px 14px",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "left",
            padding: `${theme.spacing(2)}`,
            gap: 2,
          }}
        >
          <Typography>Servers List</Typography>
          <Button level="primary" label="Add new" />
          {monitors.map((monitor, index) => {
            return (
              <Box
                key={monitor.id}
                sx={{
                  boxSizing: "border-box",
                  width: "100%",
                  padding: "10px 14px 10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `1px solid ${theme.palette.section.borderColor}`,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  bgcolor: `${theme.palette.section.bgColor}`,
                }}
              >
                <MenuIcon
                  sx={{ color: `${theme.palette.section.borderColor}` }}
                />
                <Switch
                  checked={monitorStates[index]}
                  onChange={() => handleMonitor(index)}
                />
                <Typography sx={{ flexGrow: 1 }}>{monitor.name}</Typography>
                <DeleteOutlineIcon
                  sx={{ color: `${theme.palette.section.borderColor}` }}
                />
              </Box>
            );
          })}
        </Box>
      </Container>
      <Button
        sx={{ marginTop: theme.spacing(2) }}
        level="imageSecondary"
        label="Add new section"
        img={<AddIcon />}
      />
    </>
  );
};

Section.propTypes = {
  monitors: PropTypes.array,
};

export default Section;
