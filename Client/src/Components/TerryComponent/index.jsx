// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Container } from "@mui/material";

const index = () => {
  return (
    <div>
      <Container style={{ marginTop: "100px", marginLeft: "70px" }}>
        <Button variant="contained">Feature Alert</Button>
        <Button
          style={{ margin: "10px 20px 10px 20px" }}
          className="button"
          variant="contained"
        >
          Problem Alert
        </Button>
        <Button variant="contained">Update Alert</Button>
      </Container>
    </div>
  );
};

export default index;
