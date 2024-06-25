import "./announcementsDualButtonWithIcon.css";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

/**
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Optional React node for an announcement icon
 * @param {string} props.subject - The announcement subject text
 * @param {string} props.body - The announcement body text content
 * @param {string} props.esc - The text for the escape button (usually "Close")
 * @param {string} props.primary - The text for the primary button
 * @param {function} props.closeToast - Function to close the toast notification
 * @returns {JSX.Element} - Renders the announcement dual button with icon component
 */

const AnnouncementsDualButtonWithIcon = ({
  icon,
  subject,
  body,
  esc,
  primary,
  closeToast,
}) => {
  const theme = useTheme();

  const fontLookup = {
    default: theme.font.default.font,
  };

  const fontFamily = fontLookup["default"];

  return (
    <div className="announcement-tile" style={{ fontFamily: fontFamily }}>
      {icon && <div className="announcement-icon">{icon}</div>}
      <div className="announcement-content">
        {subject && (
          <div className="announcement-content-subject">{subject}</div>
        )}
        {body && <div className="announcement-content-body">{body}</div>}
        {(esc || primary) && (
          <div className="announcement-content-controllers">
            {esc && (
              <div className="controllers-button-esc" onClick={closeToast}>
                {esc}
              </div>
            )}
            {primary && (
              <div className="controllers-button-primary">{primary}</div>
            )}
          </div>
        )}
      </div>
      <div className="announcement-close" onClick={closeToast}>
        <CloseIcon style={{ fill: "#98A2B3" }} />
      </div>
    </div>
  );
};

AnnouncementsDualButtonWithIcon.propTypes = {
  icon: PropTypes.object,
  subject: PropTypes.string,
  body: PropTypes.string,
  esc: PropTypes.string,
  primary: PropTypes.string,
  closeToast: PropTypes.func.isRequired,
};

export default AnnouncementsDualButtonWithIcon;
