import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import { InputLabel, Stack } from '@mui/material'

const AddProductInventoryDialog = ({
  open,
  selectedProducts,
  dialogInputs,
  onSubmit,
  onChange,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <form onSubmit={onSubmit}>
        <DialogTitle>Add products to inventory</DialogTitle>
        <DialogContent>
          {selectedProducts.map((p) => (
            <Stack
              key={p.id}
              direction="row"
              alignItems="center"
              spacing={2}
              py={1}
            >
              <InputLabel sx={{ minWidth: 80 }}>{`${p.brand} (${p.productTypeName})`}</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={
                  dialogInputs.find((item) => item.productId === p.id)?.price ||
                  ""
                }
                onChange={(e) => onChange(p.id, "price", e.target.value)}
                label="price"
                type="number"
                name="price"
              />
              <TextField
                margin="dense"
                id="name"
                value={
                  dialogInputs.find((item) => item.productId === p.id)?.qty ||
                  ""
                }
                onChange={(e) => onChange(p.id, "qty", e.target.value)}
                label="qty"
                type="number"
                name="qty"
              />
            </Stack>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

AddProductInventoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
    })
  ),
  dialogInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      qty: PropTypes.number.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProductInventoryDialog;
