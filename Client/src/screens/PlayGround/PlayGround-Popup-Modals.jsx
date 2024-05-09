import React from "react";
import DualButtonPopupModal from "../../components/PopupModals/DualButtonPopupModal/DualButtonPopupModal";
import DualButtonPopupModalWithTextfields from "../../components/PopupModals/DualButtonPopupModalWithTextfields/DualButtonPopupModalWithTextfields";

function PlayGroundPopupModals() {
  return (
    <div style={{ display: "flex" }}>
      <DualButtonPopupModal />
      <br />
      <br />
      <DualButtonPopupModalWithTextfields />
    </div>
  );
}

export default PlayGroundPopupModals;
