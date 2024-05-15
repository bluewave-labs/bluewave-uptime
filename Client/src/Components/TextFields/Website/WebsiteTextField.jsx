import React, { useState } from "react";
import "./websiteTextField.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {boolean} [props.showHelp=true] - Controls the visibility of the help icon (defaults to true)
 * @param {boolean} [props.hasCopyButton=false] - Controls the visibility of the copy button (defaults to false)
 * @param {string} props.hintText - The hint text displayed below the text field (required)
 * @returns {JSX.Element} - Renders the website text field component with optional help and copy features
 */
const WebsiteTextField = ({
  showHelp = true,
  hasCopyButton = false,
  hintText,
}) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div style={{ fontFamily: fontFamily }}>
      <div className="website-textfield-title">Website</div>
      <div className="website-textfield">
        <label className="website-label">http://</label>
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
            <ContentCopyIcon
              className="copy-icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="">{copied ? " Copied " : " Copy "}</span>
          </div>
        )}
      </div>
      <label className="website-textfield-hint">{hintText}</label>
    </div>
  );
};

export default WebsiteTextField;
