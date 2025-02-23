import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import PropTypes from 'prop-types'

const MeasurementUnitSelect = ({ value, onChange, id }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required id={`select-form-id-${id}`}>
        <InputLabel id="demo-simple-select-label" shrink="true">
          Measurement unit
        </InputLabel>
        <Select
          labelId={`label-id-${id}`}
          id="demo-simple-select"
          name="measurementUnit"
          variant="outlined"
          value={value}
          label="Measurement unit"
          onChange={onChange}
        >
          <MenuItem value={"KG"}>Kilograms</MenuItem>
          <MenuItem value={"G"}>Grams</MenuItem>
          <MenuItem value={"L"}>Liters</MenuItem>
          <MenuItem value={"ML"}>Milliliters</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

MeasurementUnitSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MeasurementUnitSelect;
