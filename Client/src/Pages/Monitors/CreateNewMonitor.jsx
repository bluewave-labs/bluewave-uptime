import ConfigBox from "../../Components/ConfigBox";
import FlexibileTextField from "../../Components/TextFields/Flexibile/FlexibileTextField";
import "./index.css";
import React from "react";

const CreateNewMonitor = () => {
  return (
    <div>
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <div className="new-monitor-header">Create new monitor</div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">General settings</div>
            <div className="config-box-desc-text">
              Here you can select the URL of the host, together with the type of
              monitor.
            </div>
          </div>
        }
        rightLayout={
          <div className="config-box-inputs">
            <FlexibileTextField
              title="URL to monitor"
              type="url"
              placeholder="https://google.com"
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              title="Friendly name (optional)"
              type="text"
              placeholder="Google"
            />
          </div>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Checks to perform</div>
            <div className="config-box-desc-text">
              You can always add or remove checks after adding your site.
            </div>
          </div>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Incident notifications</div>
            <div className="config-box-desc-text">
              When there is an incident, notify users.
            </div>
          </div>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Advanced settings</div>
          </div>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-medium"></div>
      <ConfigBox
        leftLayout={
          <div className="config-box-desc">
            <div className="config-box-desc-title">Proxy settings</div>
          </div>
        }
      />
    </div>
  );
};

export default CreateNewMonitor;
