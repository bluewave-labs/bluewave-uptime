import React from "react";
import { Pagination as MuiPagination } from "@mui/material";
import "./index.css";

const Pagination = () => {
  return (
    <div className="pagination-holder">
      <MuiPagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
};

export default Pagination;
