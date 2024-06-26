// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({
  open,
  type,
  title = "",
  message,
  dismissText = "Learn more",
  actionText,
}) => {
  return (
    <Snackbar open={open} className="snackbar-main">
      <Alert onClose={close} severity="info" variant="filled">
        <div className="alert-title">{title}</div>
        <div className="alert-message">{message}</div>
        <div className="alert-dismissText-actionText-parent">
          <div className="alert-dismissText">{dismissText}</div>
          <div className="alert-actionText">{actionText}</div>
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
};

export default AlertMessage;
