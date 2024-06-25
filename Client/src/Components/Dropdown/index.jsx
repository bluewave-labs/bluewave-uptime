import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Dropdown = (props) => {
  return (
    <Autocomplete
      id={props.id}
      options={props.options}
      getOptionLabel={(option) => (option.name ? option.name : "")}
      value={props.value}
      onChange={props.onChange}
      // Add isOptionEqualToValue prop
      isOptionEqualToValue={(option, value) => option.name === value}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

// Define PropTypes for DropDown component
Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Dropdown;
