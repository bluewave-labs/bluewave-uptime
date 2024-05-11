import "./announcementUpdateSubscription.css";
import React from "react";
import PropTypes from "prop-types";

const AnnouncementUpdateSubscription = ({
  title,
  text,
  cancel,
  positive,
  header,
  button,
}) => {
  return (
    <div className="update-subscription">
      <div className="update-subscription-dialog">
        <div className="subscription-dialog-title">{title}</div>
        <div className="v-spacing-small"></div>
        <div className="subscription-dialog-text">{text}</div>
        <div className="v-spacing-medium"></div>
        <div className="subscription-dialog-controls">
          <button className="controls-negative">{cancel}</button>
          <button className="controls-positive">{positive}</button>
        </div>
        <div className="v-spacing-medium"></div>
      </div>
      <div className="v-spacing-medium"></div>
      <div className="update-subscription-title">{header}</div>
      <div className="subscription-email">
        <input
          className="subscription-email-field"
          type="text"
          placeholder="olivia@untitledui.com"
        />
        <button className="subscribe-button">{button}</button>
      </div>
      <div className="v-spacing-medium"></div>
    </div>
  );
};

AnnouncementUpdateSubscription.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  cancel: PropTypes.string.isRequired,
  positive: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
};

export default AnnouncementUpdateSubscription;
