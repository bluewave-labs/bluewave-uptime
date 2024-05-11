import "./dualButtonPopupModal.css";
import React from "react";
import PropTypes from "prop-types";

const DualButtonPopupModal = ({
  open = true,
  subject,
  description,
  esc,
  save,
}) => {
  return (
    <div className="dual-button-popup-modal-holder">
      <div className="dual-button-popup-modal-subject">{subject}</div>
      <div className="dual-button-popup-modal-description">{description}</div>
      <div className="dual-modal-spacing"></div>
      <div className="dual-button-popup-modal-controllers">
        <button className="transparent-discard-button">{esc}</button>
        <button className="blue-save-button">{save}</button>
      </div>
    </div>
  );
};

DualButtonPopupModal.propTypes = {
  open: PropTypes.bool,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  save: PropTypes.string.isRequired,
};

export default DualButtonPopupModal;
