import "./searchTextField.css";
import React from "react";
import SearchSvg from "../../../assets/icons/search.svg?react";

const SearchTextField = () => {
  return (
    <div className="search-field-holder">
      <SearchSvg style={{ marginRight: "5px" }} />
      <input className="search-field" type="text" placeholder="Search" />
    </div>
  );
};

export default SearchTextField;
