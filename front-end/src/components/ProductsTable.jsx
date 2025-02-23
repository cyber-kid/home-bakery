import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  addProductToInventory,
  deleteProductById,
} from "../services/api";
import { Button } from "@mui/material";
import AddProductInventoryDialog from "./AddProductInventoryDialog";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "brand",
    label: "Product brand",
  },
  {
    id: "type",
    label: "Product type",
  },
  {
    id: "barcode",
    label: "Barcode",
  },
  {
    id: "weight",
    label: "Weight",
  },
  {
    id: "unit",
    label: "Measurement unit",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === 0 ? "left" : "right"}
            padding={index === 0 ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleAddToInventoryClick, handleDeleteSelected } =
    props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Stack direction="row" spacing={2}>
            <Button onClick={handleDeleteSelected}>Delete</Button>
            <Button onClick={handleAddToInventoryClick}>Add</Button>
          </Stack>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleAddToInventoryClick: PropTypes.func.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
};

export default function ProductsTable({ refresh }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("type");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = useState([]);

  const [dialogInputs, setDialogInputs] = useState([]);
  const [open, toggleOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setRows(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load products...");
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [refresh]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    if (selectedIndex === -1) {
      setDialogInputs((prev) => [...prev, { productId: id, qty: 0, price: 0 }]);
    } else {
      setDialogInputs((prev) => prev.filter((r) => r.productId !== id));
    }

    setSelected(newSelected);
  };

  const handleDialogInput = (id, field, value) => {
    setDialogInputs((prev) =>
      prev.map((row) =>
        row.productId === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleAddToInventoryClick = () => {
    toggleOpen(true);
  };

  const transformArray = (data) => {
    return data.flatMap(({ productId, price, qty }) =>
      Array.from({ length: qty }, () => ({ productId, price }))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const addProductsToInventory = async (products) => {
      try {
        setLoading(true);
        await addProductToInventory(products);
      } catch (err) {
        console.log(err);
        setError("Failed to add products to inventory...");
      } finally {
        setLoading(false);
      }
    };

    addProductsToInventory(transformArray(dialogInputs));

    setSelected([]);
    setDialogInputs([]);
    handleClose();
  };

  const handleDeleteSelected = async () => {
    try {
      setLoading(true);
      await Promise.all(selected.map((id) => deleteProductById(id)));

      const updatedData = await getAllProducts();
      setRows(updatedData);
    } catch (err) {
      console.error("Failed to delete products:", err);
      setError("Failed to delete products...");
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          paddingY: 1,
        }}
      >
        <Button
          component={Link}
          to={"/add-product"}
          variant="contained"
          disabled={loading}
        >
          Add product
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleAddToInventoryClick={handleAddToInventoryClick}
            handleDeleteSelected={handleDeleteSelected}
          />

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.brand}
                      </TableCell>
                      <TableCell align="right">{row.productTypeName}</TableCell>
                      <TableCell align="right">{row.barcode}</TableCell>
                      <TableCell align="right">{row.weight}</TableCell>
                      <TableCell align="right">{row.measurementUnit}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <AddProductInventoryDialog
        open={open}
        selectedProducts={rows.filter((r) => selected.includes(r.id))}
        dialogInputs={dialogInputs}
        onChange={handleDialogInput}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </Box>
  );
}

ProductsTable.propTypes = {
  refresh: PropTypes.bool.isRequired,
};
