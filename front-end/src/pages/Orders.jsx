import { Container, Typography } from "@mui/material";
import OrdersTable from "../components/OrdersTable";

const Orders = () => {
  return (
    <Container>
      <Typography variant="h3">Orders Page</Typography>
      <Typography variant="subtitle1">
        This is the Orders page content.
      </Typography>
      <OrdersTable />
    </Container>
  );
};

export default Orders;
