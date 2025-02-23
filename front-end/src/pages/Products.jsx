import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProductsTable from "../components/ProductsTable";
import { useState, useEffect } from "react";

const Products = () => {
  const location = useLocation();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev);
    }
  }, [location]);

  return (
    <Container>
      <Typography variant="h3">Products Page</Typography>
      <Typography variant="subtitle1">
        This is the Products page content.
      </Typography>

      <ProductsTable refresh={refresh} />
    </Container>
  );
};

export default Products;
