import DropdownTeamMember from "../../Components/DropdownTeamMember";
import "./index.css";
import Button from "../../Components/Button";
import Label from "../../Components/Label";
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
          <Label label="Label" color={theme.palette.labelOrange.textColor} />
          <Label label="Label" color={theme.palette.labelGray.textColor} />
          <Label label="Label" color={theme.palette.labelPurple.textColor} />
          <Label label="Label" color={theme.palette.labelGreen.textColor} />
        </div>
      </div>
    </>
  );
};

export default Home;
