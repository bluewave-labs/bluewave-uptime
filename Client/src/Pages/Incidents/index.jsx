import React from "react";
import "./index.css";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Incidents = () => {
  const maintenanceItems = [
    "Mark your maintenance periods",
    "Eliminate any misunderstandings",
    "Stop sending alerts in maintenance windows",
  ];

  return (
    <Card>
      <CardContent>
        <Box />
        <Typography>Create a maintenance window to</Typography>
        <List>
          {maintenanceItems.map((item, index) => {
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>;
          })}
        </List>
      </CardContent>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Let&apos;s create your maintenance window
        </Button>
      </Box>
    </Card>
  );
};

export default Incidents;
