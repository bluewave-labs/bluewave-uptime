import "./index.css";
import ConfigBox from "../../Components/ConfigBox";
import FlexibileTextField from "../../Components/TextFields/Flexibile/FlexibileTextField";
import React, { useState } from "react";
import RadioButton from "../../Components/RadioButton";
import CustomizableCheckBox from "../../Components/Checkbox/CustomizableCheckbox";
import Button from "../../Components/Button";
import { MenuItem, Select } from "@mui/material";

const CreateNewMonitor = () => {
  //General Settings Form
  const [generalSettings, setGeneralSettings] = useState({ url: "", name: "" });
  //Checks Form
  const [checks, setChecks] = useState({ type: "", port: "" });
  //Incidents Form
  const [notifications, setNotifications] = useState({
    viaSms: false,
    viaEmail: false,
    viaOther: false,
    email: "",
  });
  //Advanced Settings Form
  const [advancedSettings, setAdvancedSettings] = useState({
    frequency: "",
    retries: "",
    codes: "",
    redirects: "",
  });
  //Proxy Settings Form
  const [proxy, setProxy] = useState({
    enabled: false,
    protocol: "",
    address: "",
    proxy_port: "",
  });

  const handleChange = (event, id, setState, checkbox) => {
    const { value } = event.target;
    setState((prev) => ({
      ...prev,
      [id]: checkbox ? true : value,
    }));
  };
  const handleCheck = (id, setState) => {
    setState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCreateNewMonitor = () => {

  }

  const ports = ["Port 1", "Port 2", "Port 3"];
  const frequencies = [1, 2, 3, 4, 5];

  return (
    <form onSubmit={handleCreateNewMonitor} noValidate spellCheck="false">
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
              id="monitor-url"
              title="URL to monitor"
              type="url"
              placeholder="https://google.com"
              value={generalSettings.url}
              onChange={(event) =>
                handleChange(event, "url", setGeneralSettings)
              }
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-name"
              title="Friendly name (optional)"
              type="text"
              placeholder="Google"
              value={generalSettings.name}
              onChange={(event) =>
                handleChange(event, "name", setGeneralSettings)
              }
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
              id="monitor-checks-http"
              title="HTTP/website monitoring"
              desc="Use HTTP(s) to monitor your website or API endpoint."
              value="http"
              checked={checks.monitor === "http"}
              onChange={(event) => handleChange(event, "monitor", setChecks)}
            />
            <div className="monitors-gaps-medium"></div>
            <RadioButton
              id="monitor-checks-ping"
              title="Ping monitoring"
              desc="Check whether your server is available or not."
              value="ping"
              checked={checks.monitor === "ping"}
              onChange={(event) => handleChange(event, "monitor", setChecks)}
            />
            <div className="monitors-gaps-medium"></div>
            {/* TODO */}
            {/* <RadioButton
              id="monitor-checks-port"
              title="Port monitoring"
              desc="Monitor a specific service on your server."
              value="port"
              checked={checks.monitor === "port"}
              onChange={(event) => handleChange(event, "monitor", setChecks)}
            />
            <div className="monitors-gaps-small-plus"></div>
            <div className="monitors-dropdown-holder">
              <Select
                id="monitor-ports"
                value={checks.port || "placeholder"}
                inputProps={{ id: "monitor-ports-select" }}
                onChange={(event) => handleChange(event, "port", setChecks)}
              >
                <MenuItem id="port-placeholder" value="placeholder">
                  Select a port to check
                </MenuItem>
                {ports.map((port, index) => (
                  <MenuItem key={`port-${index}`} value={port}>
                    {port}
                  </MenuItem>
                ))}
              </Select>
            </div> */}
          </div>
        }
      />
      {/* TODO */}
      {/* <div className="monitors-gaps-medium"></div>
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
                id="monitor-notify-sms"
                title="Notify via SMS (to be implemented)"
                isChecked={notifications.viaSms}
                handleChange={() => handleCheck("viaSms", setNotifications)}
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                id="monitor-notify-email"
                title="Notify via email (to current email address)"
                isChecked={notifications.viaEmail}
                handleChange={() => handleCheck("viaEmail", setNotifications)}
              />
              <div className="monitors-gaps-medium"></div>
              <CustomizableCheckBox
                id="monitor-notify-other"
                title="Notify via email (to another email address below)"
                isChecked={notifications.viaOther}
                handleChange={() => handleCheck("viaOther", setNotifications)}
              />
              <div className="monitors-gaps-small-plus"></div>
              <div className="monitors-dropdown-holder">
                <FlexibileTextField
                  id="monitor-notify-other-email"
                  placeholder="notifications@gmail.com"
                  type="email"
                  value={notifications.email}
                  onChange={(event) =>
                    handleChange(event, "email", setNotifications)
                  }
                />
              </div>
            </div>
          </div>
        }
      /> */}
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
            <Select
              id="monitor-frequencies"
              value={advancedSettings.frequency || 1}
              inputProps={{ id: "monitor-frequencies-select" }}
              onChange={(event) =>
                handleChange(event, "frequency", setAdvancedSettings)
              }
            >
              {frequencies.map((freq) => (
                <MenuItem key={`port-${freq}`} value={freq}>
                  {freq} {freq === 1 ? "minute" : "minutes"}
                </MenuItem>
              ))}
            </Select>
            <div className="monitors-gaps-medium"></div>
            {/* TODO */}
            {/* <FlexibileTextField
              id="monitor-settings-retries"
              title="Maximum retries before the service is marked as down"
              type="number"
              value={advancedSettings.retries}
              onChange={(event) =>
                handleChange(event, "retries", setAdvancedSettings)
              }
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-settings-codes"
              title="Accepted status codes"
              type="number"
              value={advancedSettings.codes}
              onChange={(event) =>
                handleChange(event, "codes", setAdvancedSettings)
              }
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-settings-redirects"
              title="Maximum redirects"
              type="number"
              value={advancedSettings.redirects}
              onChange={(event) =>
                handleChange(event, "redirects", setAdvancedSettings)
              }
            /> */}
          </div>
        }
      />
      {/* TODO */}
      {/* <div className="monitors-gaps-medium"></div>
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
              id="monitor-proxy-enable"
              title="Enable proxy"
              isChecked={proxy.enabled}
              handleChange={() => handleCheck("enabled", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-protocol"
              title="Proxy protocol"
              value={proxy.protocol}
              onChange={(event) => handleChange(event, "protocol", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-address"
              title="Proxy address"
              value={proxy.address}
              onChange={(event) => handleChange(event, "address", setProxy)}
            />
            <div className="monitors-gaps-medium"></div>
            <FlexibileTextField
              id="monitor-proxy-port"
              title="Proxy port"
              value={proxy.proxy_port}
              onChange={(event) => handleChange(event, "proxy_port", setProxy)}
            />
          </div>
        }
      /> */}
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
    </form>
  );
};

export default CreateNewMonitor;
