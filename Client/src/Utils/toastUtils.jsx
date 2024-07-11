import { toast } from "react-toastify";
import Alert from "../Components/Alert";

export const createToast = ({ variant, title, body, hasIcon, config = {} }) => {
  const toastConfig = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    ...config,
  };

  toast(
    ({ closeToast }) => (
      <Alert
        variant={variant}
        title={title}
        body={body}
        isToast={true}
        hasIcon={hasIcon}
        onClick={closeToast}
      />
    ),
    toastConfig
  );
};
