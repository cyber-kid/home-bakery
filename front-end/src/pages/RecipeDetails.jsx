import { Alert, Button, Container, List, ListItem, ListItemIcon, ListItemText, Typography, } from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteRecipeById } from '../services/api'
import StandardImageList from '../components/StandardImageList'

const RecipeDetails = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteRecipeById(recipe.id);
      navigate("/recipes");
    } catch (err) {
      console.error("Failed to delete a recipe:", err);
      setError("Failed to delete a recipe...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h3">{recipe.name}</Typography>
      <StandardImageList />
      <Typography pt={1} variant="subtitle1">
        {recipe.description}
      </Typography>
      <Typography sx={{ mt: 2 }} variant="h6" component="div">
        Ingridients:
      </Typography>
      <List dense={true}>
        {recipe.recipeDetails.map((detail) => (
          <ListItem key={detail.productTypeId}>
            <ListItemIcon>
              <CookieIcon />
            </ListItemIcon>
            <ListItemText
              primary={detail.productTypeName}
              // ToDo create a func to properly display the measurement unit
              secondary={`Amount: ${detail.weight} ${detail.measurementUnit}`}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleDelete}>
        {loading ? "Deleting..." : "Delete recipe"}
      </Button>
    </Container>
  );
};

export default RecipeDetails;
