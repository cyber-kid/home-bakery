import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid2,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ProductTypeAutocomplete from "../components/ProductTypeAutocomplete";
import MeasurementUnitSelect from "../components/MeasurementUnitSelect";
import { saveProduct } from "../services/api";

const AddProduct = () => {
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [weight, setWeight] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [validDays, setValidDays] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    const addProduct = async (products) => {
      try {
        setLoading(true);
        await saveProduct(products);
        navigate("/products");
      } catch (err) {
        console.log(err);
        setError("Failed to load recipes...");
      } finally {
        setLoading(false);
      }
    };

    addProduct({
      ...productType,
      barcode,
      brand,
      weight,
      validDays,
      description,
      measurementUnit,
    });
  };

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          paddingY: 1,
        }}
      >
        Add product
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid2 container spacing={2}>
        <Grid2>
          <ProductTypeAutocomplete
            id={"test-id"}
            value={productType}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setProductType({
                  productTypeName: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setProductType({
                  productTypeName: newValue.inputValue,
                });
              } else {
                setProductType(newValue);
              }
            }}
          />
        </Grid2>

        <Grid2>
          <TextField
            required
            id="brand-required"
            label="Brand"
            value={brand}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </Grid2>

        <Grid2>
          <TextField
            id="weight-number"
            required
            label="Weight"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid2>

        <Grid2 size={2}>
          <MeasurementUnitSelect
            id="select-id"
            value={measurementUnit}
            onChange={(e) => {
              setMeasurementUnit(e.target.value);
            }}
          />
        </Grid2>

        <Grid2>
          <TextField
            required
            id="barcode-required"
            label="Barcode"
            value={barcode}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
          />
        </Grid2>

        <Grid2>
          <TextField
            id="valid-days-number"
            required
            label="Valid days"
            value={validDays}
            onChange={(e) => {
              setValidDays(e.target.value);
            }}
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid2>

        <Grid2>
          <TextField
            required
            id="desc-required"
            label="Description"
            value={description}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Grid2>
      </Grid2>
      <Box
        sx={{
          paddingY: 1,
        }}
      >
        <Button variant="contained" onClick={handleOnClick} disabled={loading}>
          {loading ? "Saving..." : "Save product"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
