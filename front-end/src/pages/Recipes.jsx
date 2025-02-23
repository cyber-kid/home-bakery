import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid2,
  Box,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../services/api";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const loadAllRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load recipes...");
      } finally {
        setLoading(false);
      }
    };

    loadAllRecipes();
  }, [location.key]);

  return (
    <Container>
      <Typography variant="h3">Recipes Page</Typography>
      <Typography variant="subtitle1">
        This is the Recipes page content.
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          paddingY: 1,
        }}
      >
        <Button
          component={Link}
          to={"/add-recipe"}
          variant="contained"
          disabled={loading}
        >
          Add recipe
        </Button>
      </Box>
      <Box
        sx={{
          paddingY: 1,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid2 container spacing={2}>
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </Grid2>
        )}
      </Box>
    </Container>
  );
};

export default Recipes;
