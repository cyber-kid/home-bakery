import { Grid2, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/recipes/${recipe.id}`, { state: recipe });
  };

  return (
    <Grid2 size={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="src/assets/logo.jpg"
          title={recipe.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small" onClick={handleNavigate}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
