import PropTypes from "prop-types";
import ComplexAlert from "../../Components/Icons/ComplexAlert/ComplexAlert";
import AnnouncementsDualButtonWithIcon from "./AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";

/**
 * ToastComponent displays a notification that is triggered by error messages.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.subject - The subject or title of the toast message
 * @param {string} props.body - The body content of the toast message
 * @param {string} props.esc - The text for the dismiss action button
 * @param {string} props.primary - The text for the primary action button
 * @returns {JSX.Element} JSX element representing the ToastComponent
 */

const ToastComponent = ({ subject, body, esc, primary }) => {
  const displayMsg = () => {
    toast(
      ({ closeToast, toastProps }) => (
        <AnnouncementsDualButtonWithIcon
          icon={<ComplexAlert theme="red" />}
          subject={subject}
          body={body}
          esc={esc}
          primary={primary}
          closeToast={closeToast}
        />
      ),
      { closeButton: false }
    );
  };

  return (
    <div>
      <button onClick={displayMsg}>Click me</button>
      <ToastContainer className="Toastify__toast-container" />
    </div>
  );
};

ToastComponent.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  esc: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
};

export default ToastComponent;
