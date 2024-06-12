import { useState, useEffect } from "react";
import ComplexAlert from "../../Components/Icons/ComplexAlert/ComplexAlert";
import "./index.css"; // Import your CSS file for toast styles

const Toast = () => {
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(100); // Start with full progress

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      // Interval to update progress bar
      const interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress - (100 / 5000 * 100)); // Decrease progress based on time
      }, 100); // Update every 100 milliseconds

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [showToast]);

  const toggleToast = () => {
    setShowToast(!showToast);
    setProgress(100); // Reset progress when showing toast
  };

  return (
    <div className="toast-container">
      <button onClick={toggleToast}>Show Toast</button>
      {showToast && (
        <div className="toast">
          <span className="close-button" onClick={toggleToast}>&times;</span>
          <div className="icon">
            {<ComplexAlert theme="red" />}
          </div>
          <div className="toast-content">
            <div className="announcement-content">
              <div className="announcement-content-subject">
                There was a problem with that action
              </div>
              <div className="announcement-content-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.
              </div>
              <div className="announcement-content-controllers">
                <div className="controllers-button-esc" onClick={toggleToast}>Dismiss</div>
                <div className="controllers-button-primary">View changes</div>
              </div>
            </div>
          </div>
          <div className="toast-progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default Toast;
