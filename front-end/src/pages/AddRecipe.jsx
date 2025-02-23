import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid2,
  IconButton,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ProductTypeAutocomplete from "../components/ProductTypeAutocomplete";
import MeasurementUnitSelect from "../components/MeasurementUnitSelect";
import { saveRecipe } from "../services/api";

const AddRecipe = () => {
  const [recipeDetails, setRecipeDetails] = useState([
    { productType: "", weight: 0, measurementUnit: "" },
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddField = () => {
    setRecipeDetails([
      ...recipeDetails,
      { productType: "", weight: 0, measurementUnit: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const newIngredients = recipeDetails.filter((_, i) => i !== index);
    setRecipeDetails(newIngredients);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...recipeDetails];

    newItems[index][name] = value;

    setRecipeDetails(newItems);
  };

  const handleOnSaveClick = () => {
    const addRecipe = async (recipe) => {
      try {
        setLoading(true);
        await saveRecipe(recipe);
        navigate("/recipes");
      } catch (err) {
        console.log(err);
        setError("Failed to save recipe...");
      } finally {
        setLoading(false);
      }
    };

    addRecipe({
      recipeDetails: recipeDetails.map((details) => ({
        ...details.productType,
        weight: details.weight,
        measurementUnit: details.measurementUnit,
      })),
      name,
      description,
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
        Add recipe
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid2 container spacing={2} pt={1}>
        <Grid2 size={4}>
          <TextField
            required
            id="name-required"
            label="Name"
            fullWidth
            placeholder="Enter a name..."
            value={name}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid2>

        <Grid2 size={8}>
          <TextField
            required
            fullWidth
            id="desc-required"
            label="Description"
            placeholder="Enter a description..."
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
        {recipeDetails.map((ingredient, index) => (
          <Grid2
            key={index}
            container
            spacing={2}
            alignItems="center"
            size={12}
          >
            <Grid2 size={6}>
              <ProductTypeAutocomplete
                id={"test-id"}
                value={ingredient.productType}
                onChange={(event, newValue) => {
                  const newItems = [...recipeDetails];
                  if (typeof newValue === "string") {
                    newItems[index]["productType"] = {
                      productTypeName: newValue,
                    };
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    newItems[index]["productType"] = {
                      productTypeName: newValue.inputValue,
                    };
                  } else {
                    newItems[index]["productType"] = newValue;
                  }
                }}
              />
            </Grid2>

            <Grid2 size={2}>
              <TextField
                id="weight-number"
                required
                label="Weight"
                placeholder="Enter weight..."
                name="weight"
                value={ingredient.weight}
                onChange={(event) => handleChange(index, event)}
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
                value={ingredient.measurementUnit}
                onChange={(event) => handleChange(index, event)}
              />
            </Grid2>

            <Grid2 size={2}>
              <IconButton
                onClick={() => handleRemoveField(index)}
                disabled={recipeDetails.length === 1}
              >
                <Remove />
              </IconButton>
            </Grid2>
          </Grid2>
        ))}

        <Grid2 size={12}>
          <Button
            onClick={handleAddField}
            variant="outlined"
            startIcon={<Add />}
            fullWidth
          >
            Add Ingredient
          </Button>
        </Grid2>
      </Grid2>
      <Box
        sx={{
          paddingY: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={handleOnSaveClick}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save recipe"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddRecipe;
