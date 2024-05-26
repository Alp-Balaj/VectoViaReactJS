import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectDropdown = ({ options = [], selectedOptions = [], onChange }) => {
    const handleChange = (selected) => {
        const selectedValues = selected ? selected.map(option => option.value) : [];
        onChange(selectedValues);
    };

    const formattedOptions = options.map(option => ({ value: option.pickUpLocationID, label: option.locationName }));

    const selectedValues = formattedOptions.filter(option => selectedOptions.includes(option.value));

    return (
        <Select
            isMulti
            options={formattedOptions}
            value={selectedValues}
            onChange={handleChange}
        />
    );
};

MultiSelectDropdown.propTypes = {
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

export default MultiSelectDropdown;