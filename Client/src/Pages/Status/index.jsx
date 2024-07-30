import Fallback from "../../Components/Fallback";
import { useTheme } from "@emotion/react";

const Status = () => {
  const theme = useTheme();

  return (
    <div className="status">
      <Fallback
        title="status page"
        checks={[
          "Share your uptime publicly",
          "Keep your users informed about incidents",
          "Build trust with your customers",
        ]}
      />
    </div>
  );
};

export default Status;
