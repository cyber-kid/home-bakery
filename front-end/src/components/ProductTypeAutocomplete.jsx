import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getAllProductTypes } from "../services/api";

const filter = createFilterOptions();

const ProductTypeAutocomplete = ({ value, onChange, id }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProductTypes = async () => {
      try {
        const data = await getAllProductTypes();
        setProductTypes(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load product types...");
      } finally {
        setLoading(false);
      }
    };

    loadAllProductTypes();
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.productTypeName
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            productTypeName: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={id}
      options={productTypes}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.productTypeName;
      }}
      renderOption={(props, option) => {
        // eslint-disable-next-line react/prop-types
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.productTypeName}
          </li>
        );
      }}
      freeSolo
      //   sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Product type"
          placeholder="Select a product type..."
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      )}
    />
  );
};

ProductTypeAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductTypeAutocomplete;
