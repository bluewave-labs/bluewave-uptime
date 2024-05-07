import DropdownTeamMember from "../../Components/DropdownTeamMember";
import "./index.css";
import Button from "../../Components/Button";
import BaseLabel from "../../Components/Label/BaseLabel";
import { useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  return (
    <>
      <div>Home</div>
      <DropdownTeamMember />
      <div>
        <h4>Buttons</h4>
        <div>
          <Button level="primary" label="Primary" />
          <Button level="secondary" label="Secondary" />
          <Button level="tertiary" label="Tertiary" />
          <Button level="error" label="Error" />
        </div>
        <h4>Disabled Buttons</h4>
        <div>
          <Button level="primary" label="Primary" disabled />
          <Button level="secondary" label="Secondary" disabled />
          <Button level="tertiary" label="Tertiary" disabled />
          <Button level="error" label="Error" disabled />
        </div>
        <h4>Labels</h4>
        <div>
          <BaseLabel label="Label" color={theme.palette.labelGray.textColor} />
          <BaseLabel
            label="Label"
            color={theme.palette.labelPurple.textColor}
          />
          <BaseLabel label="Label" color={theme.palette.labelGreen.textColor} />
          <BaseLabel
            label="Label"
            color={theme.palette.labelOrange.textColor}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
