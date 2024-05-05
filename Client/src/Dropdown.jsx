import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DropDown = ({ id, label, options, onChange, value }) => {
  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={(option) => option.name} // Assuming each team member object has a 'name' property
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default DropDown;
