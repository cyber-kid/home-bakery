import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./components/AppAppBar";
import Recipes from "./pages/Recipes";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import AddProduct from "./pages/AddProduct";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <AppTheme {...{}}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: "flex", flexDirection: "column", my: 8, gap: 4 }}
        ></Container>
      </AppTheme>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
