// eslint-disable-next-line no-unused-vars
import React from "react";
import "./AlertMessage.css";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({
  open,
  type,
  title = "",
  message,
  dismissText = "Learn more",
  actionText,
  close,
  dismissClose,
}) => {
  // Function to determine icon color based on the title
  const switchIconColor = (type) => {
    switch (type) {
      case "release":
        return "black";
      case "problem":
        return "red";
      case "update":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <Snackbar open={open} className="snackbar-main">
      <Alert
        onClose={close}
        severity="info"
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "white",
          color: "black",
          border: "2px solid lightgrey",
          "& .MuiAlert-icon": {
            color: switchIconColor(type), // Change this to the desired color
          },
          "& .MuiButtonBase-root": {
            color: "grey",
          },
        }}
      >
        <div className="alert-title">{title}</div>
        <div className="alert-message">{message}</div>
        <div className="alert-dismissText-actionText-parent">
          <div className="alert-dismissText">{dismissText}</div>
          <div className="alert-actionText" onClick={dismissClose}>
            {actionText}
          </div>
        </div>
      </Alert>
    </Snackbar>
  );
};

AlertMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  dismissText: PropTypes.string,
  actionText: PropTypes.string,
  close: PropTypes.func,
  dismissClose: PropTypes.func,
};

export default AlertMessage;
