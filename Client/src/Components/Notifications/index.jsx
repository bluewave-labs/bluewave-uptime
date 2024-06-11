import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return <ToastContainer />;
};

export const notify = (message) => toast(message);

export default Notification;
