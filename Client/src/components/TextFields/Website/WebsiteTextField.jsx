import React, { useState } from "react";
import "./websiteTextField.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function WebsiteTextField({
  showHelp = true,
  hasCopyButton = false,
  hintText,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <div className="website-textfield">
        <label className="website-label" htmlFor="website">
          http://
        </label>
        <input
          type="url"
          name="website-url"
          id="website-url"
          className="website-url"
        />
        {showHelp && (
          <div
            className={
              `website-icon-holder ` + !hasCopyButton
                ? "with-no-copy-button"
                : ""
            }
          >
            <HelpOutlineIcon style={{ fill: "var(--icon-color)" }} />
          </div>
        )}
        {hasCopyButton && (
          <div className="copy-to-clipboard-button" onClick={handleCopy}>
            <ContentCopyIcon className="copy-icon" />
            <span>{copied ? " Copied " : " Copy "}</span>
          </div>
        )}
      </div>
      <label className="website-textfield-hint">{hintText}</label>
    </>
  );
}

export default WebsiteTextField;
