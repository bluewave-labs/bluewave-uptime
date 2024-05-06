import PropTypes from 'prop-types';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Dropdown = ({ id, label, options, onChange, value }) => {
    return (
        <Autocomplete
            id={id}
            options={options}
            getOptionLabel={(option) => option.name}
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
};

// Define PropTypes for DropDown component
Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
};

export default Dropdown;
