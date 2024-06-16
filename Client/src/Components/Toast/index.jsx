import ComplexAlert from "../../Components/Icons/ComplexAlert/ComplexAlert";
import AnnouncementsDualButtonWithIcon from "../../Components/Announcements/AnnouncementsDualButtonWithIcon/AnnouncementsDualButtonWithIcon";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";

const ToastComponent = () => {
  const displayMsg = () => {
    toast(
      ({ closeToast, toastProps }) => (
        <AnnouncementsDualButtonWithIcon
          icon={<ComplexAlert theme="red" />}
          subject="There was a problem with that action"
          body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
          esc="Dismiss"
          primary="Learn more"
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

export default ToastComponent;
