// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import AlertMessage from "./reusable/AlertMessage";

const Index = () => {
  const [notification, setNotification] = useState({
    open: false,
    title: "",
    message: "",
    type: "",
    alertMessageType: "",
    actionText: "",
  });

  const handleOpenAlertMessage = (type, title, message, actionText) => {
    setNotification({
      ...notification,
      open: true,
      title,
      type,
      message,
      actionText,
    });
  };

  return (
    <div>
      <Container style={{ marginTop: "100px", marginLeft: "70px" }}>
        <Button
          variant="contained"
          onClick={() =>
            handleOpenAlertMessage(
              "release",
              "We've just released a new feature",
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.",
              "View changes"
            )
          }
        >
          Feature Alert
        </Button>
        <Button
          style={{ margin: "10px 20px 10px 20px" }}
          className="button"
          variant="contained"
          onClick={() =>
            handleOpenAlertMessage(
              "problem",
              "There was a problem with that action",
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.",
              "Learn more"
            )
          }
        >
          Problem Alert
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            handleOpenAlertMessage(
              "update",
              "Successfully updated profile",
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid pariatur, ipsum dolor.",
              "View changes"
            )
          }
        >
          Update Alert
        </Button>

        <AlertMessage
          open={notification.open}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          dismissText="Dismiss"
          actionText={notification.actionText}
        />
      </Container>
    </div>
  );
};

export default Index;
