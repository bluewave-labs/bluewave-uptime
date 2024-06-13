import "./searchTextField.css";
import React from "react";
import Search from "../../../assets/Images/Icon-search-gray.png";

const SearchTextField = () => {
  return (
    <div className="search-field-holder">
      <img className="search-field-icon" src={Search} alt="Search" />
      <input className="search-field" type="text" placeholder="Search" />
    </div>
  );
};

export default SearchTextField;
