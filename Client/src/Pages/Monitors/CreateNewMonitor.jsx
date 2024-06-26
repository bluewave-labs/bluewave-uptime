import "./index.css";
import ConfigBox from "../../Components/ConfigBox";
import FlexibileTextField from "../../Components/TextFields/Flexibile/FlexibileTextField";
import React, { useState } from "react";
import RadioButton from "../../Components/RadioButton";
import Dropdown from "../../Components/Dropdown";
import CustomizableCheckBox from "../../Components/Checkbox/CustomizableCheckbox";
import Button from "../../Components/Button";

const CreateNewMonitor = () => {
  const portOptions = [
    { label: "Port 1", value: "Port1" },
    { label: "Port 2", value: "Port2" },
    // Add more Ports as needed
  ];

  const frequencyOptions = [
    { label: "1 minute", value: "1" },
    { label: "5 minutes", value: "5" },
    // Add more Ports as needed
  ];

  const [incidentEmail, setIncidentEmail] = useState("");

  const [notifyViaSMS, setNotifyViaSMS] = useState(false);
  const [notifyViaEmail, setNotifyViaEmail] = useState(false);
  const [notifyViaCurrentEmail, setNotifyViaCurrentEmail] = useState(false);

  const [maxRetries, setMaxRetries] = useState(0);
  const [acceptCode, setAcceptCode] = useState(0);
  const [maxRedirects, setMaxRedirects] = useState(0);

  const [proxy, setProxy] = useState(false);

  const [proxyAddress, setProxyAddress] = useState("");
  const [proxyPort, setProxyPort] = useState("");

  const [selectedMonitorType, setSelectedMonitorType] = useState("");

  const [urlToMonitor, setUrlToMonitor] = useState("");
  const [friendlyName, setFriendlyName] = useState("");

  const [port, setPort] = useState("Select a port to check");
  const [frequncy, setFrequency] = useState("1 minute");

  const handlePortOptionChange = (newValue) => {
    setPort(newValue);
  };

  const handleFrequencyOptionChange = (newValue) => {
    setPort(newValue);
  };

  const handleUrlToMonitor = (event) => {
    setUrlToMonitor(event.target.value);
    console.log(urlToMonitor);
  };

  const handleFriendlyName = (event) => {
    setFriendlyName(event.target.value);
    console.log(friendlyName);
  };

  const handleIncidentEmail = (event) => {
    setIncidentEmail(event.target.value);
    console.log(incidentEmail);
  };

  const handleNotifyViaSMS = (event) => {
    setNotifyViaSMS(event.target.checked);
  };

  const handleNotifyViaEmail = (event) => {
    setNotifyViaEmail(event.target.checked);
  };

  const handleNotifyViaCurrentEmail = (event) => {
    setNotifyViaCurrentEmail(event.target.checked);
  };

  const handleSetMaxRetries = (event) => {
    setMaxRetries(event.target.value);
    console.log(maxRetries);
  };

  const handleSetAcceptCode = (event) => {
    setAcceptCode(event.target.value);
    console.log(acceptCode);
  };

  const handleSetMaxRedirects = (event) => {
    setMaxRedirects(event.target.value);
    console.log(maxRedirects);
  };

  const handleEnableProxy = (event) => {
    setProxy(event.target.value);
    console.log(proxy);
  };

  const handleproxyAddress = (event) => {
    setProxyAddress(event.target.value);
    console.log(proxyAddress);
  };

  const handleproxyPort = (event) => {
    setProxyPort(event.target.value);
    console.log(proxyPort);
  };

  const handleMonitorTypeChange = (value) => {
    setSelectedMonitorType(value);
    console.log(value);
  };

  const handleCreateNewMonitor = () => {
    console.log("Created");
  };

  return (
    <div>
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
              onChange={handleUrlToMonitor}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              title="Friendly name (optional)"
              type="text"
              placeholder="Google"
              onChange={handleFriendlyName}
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
        rightLayout={
          <div className="service-check-list">
            <RadioButton
              title="HTTP/website monitoring"
              desc="Use HTTP(s) to monitor your website or API endpoint."
              value="http"
              checked={selectedMonitorType === "http"}
              onChange={() => handleMonitorTypeChange("http")}
            />
            <div className="monitors-gaps-medium"></div>
            <RadioButton
              title="Ping monitoring"
              desc="Check whether your server is available or not."
              value="ping"
              checked={selectedMonitorType === "ping"}
              onChange={() => handleMonitorTypeChange("ping")}
            />
            <div className="monitors-gaps-medium"></div>
            <RadioButton
              title="Port monitoring"
              desc="Monitor a specific service on your server."
              value="port"
              checked={selectedMonitorType === "port"}
              onChange={() => handleMonitorTypeChange("port")}
            />
            <div className="monitors-gaps-small-plus"></div>
            <div className="monitors-dropdown-holder">
              <Dropdown
                id="ports-dropdown"
                label="Select a port to check"
                onChange={handlePortOptionChange}
                options={portOptions}
                value={port}
              />
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
        rightLayout={
          <div className="incident-notif-config">
            <div className="incident-notif-config-title">
              When there is a new incident,
            </div>
            <div className="monitors-gaps-medium"></div>
            <div className="incident-notif-config-checks">
              <CustomizableCheckBox
                isChecked={notifyViaSMS}
                handleChange={handleNotifyViaSMS}
                title="Notify via SMS (to be implemented)"
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                isChecked={notifyViaEmail}
                handleChange={handleNotifyViaEmail}
                title="Notify via email (to current email address)"
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                isChecked={notifyViaCurrentEmail}
                handleChange={handleNotifyViaCurrentEmail}
                title="Notify via email (to another email address below)"
              />
              <div className="monitors-gaps-small-plus"></div>
              <div className="monitors-dropdown-holder">
                <FlexibileTextField
                  placeholder="notifications@gmail.com"
                  type="email"
                  value={incidentEmail}
                  onChange={handleIncidentEmail}
                />
              </div>
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
        rightLayout={
          <div className="advanced-setting-config">
            <div className="adv-setting-title">Check frequency</div>
            <div className="monitors-gaps-small"></div>
            <Dropdown
              id="freq-dropdown"
              label="1 minutes"
              onChange={handleFrequencyOptionChange}
              options={frequencyOptions}
              value={frequencyOptions}
            />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">
              Maximum retries before the service is marked as down
            </div>
            <FlexibileTextField
              onChange={handleSetMaxRetries}
              type="number"
              placeholder=""
            />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">Accepted status codes</div>
            <FlexibileTextField
              onChange={handleSetAcceptCode}
              type="number"
              placeholder=""
            />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">Maximum redirects</div>
            <FlexibileTextField
              onChange={handleSetMaxRedirects}
              type="number"
              placeholder=""
            />
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
        rightLayout={
          <div className="proxy-setting-config">
            <CustomizableCheckBox
              isChecked={proxy}
              handleChange={handleEnableProxy}
              title="Enable proxy"
            />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">Proxy protocol</div>
            <FlexibileTextField />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">Proxy address</div>
            <FlexibileTextField onChange={handleproxyAddress} />
            <div className="monitors-gaps-medium"></div>
            <div className="adv-setting-title">Proxy port</div>
            <FlexibileTextField onChange={handleproxyPort} />
          </div>
        }
      />
      <div className="monitors-gaps-medium"></div>
      <div className="monitors-gaps-small"></div>
      <div className="monitors-create-button-holder">
        <Button
          id="create-new-monitor-btn"
          level="primary"
          label="Create new monitor"
          sx={{ width: "210px", fontSize: "var(--env-var-font-size-medium)" }}
          onClick={() => handleCreateNewMonitor()}
        />
      </div>
    </div>
  );
};

export default CreateNewMonitor;
