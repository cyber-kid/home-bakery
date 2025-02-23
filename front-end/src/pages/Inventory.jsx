import { Container, Typography } from "@mui/material";
import ProductsInventoryTable from "../components/ProductsInventoryTable";

const Inventory = () => {
  return (
    <Container>
      <Typography variant="h3">Inventory Page</Typography>
      <Typography variant="subtitle1">
        This is the Inventory page content.
      </Typography>
      <ProductsInventoryTable />
    </Container>
  );
};

export default Inventory;
