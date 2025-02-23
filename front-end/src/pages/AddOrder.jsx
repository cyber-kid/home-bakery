import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllRecipes, getProductsByType, saveOrder } from '../services/api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InventorySelectionTable from '../components/InventorySelctionTeble.jsx'
import { convert } from '../utils/converter.js'
import Decimal from 'decimal.js'
import { useNavigate } from 'react-router-dom'

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
  {
    id: "purchase-date",
    label: "Purchase date",
  },
  {
    id: "valid-days",
    label: "Valid for",
  },
  {
    id: "price",
    label: "Price",
  }
];

const AddOrder = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({recipeDetails: [], name: ""});
  const [productsByType, setProductsByType] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrderFulfilled, setIsOrderFulfilled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSaveOrder = () => {
    const addOrder = async (order) => {
      try {
        setLoading(true);
        await saveOrder(order);
        navigate("/orders");
      } catch (err) {
        console.log(err);
        setError("Failed to save order...");
      } finally {
        setLoading(false);
      }
    };

    const order = {
      price: totalPrice,
      recipeId: selectedRecipe.id,
      orderDetails: Object.entries(selectedProducts).map(([productTypeId, data]) => ({
        productTypeId,
        price: data.price,
        selected: data.selected,
      }))
    };

    addOrder(order); // ToDo handle promise
  };

  const handleInventoryProductSelection = (event, productInventory) => {
    const {productTypeId, id: productInventoryId, weight, remainingWeight, price, measurementUnit} = productInventory;
    let { selected, fulfilled, measurementUnit: orderMeasurementUnit, notFulfilledWeight, price: orderPrice } = selectedProducts[productTypeId];

    const remainingWeightConverted = convert(measurementUnit, orderMeasurementUnit, new Decimal(remainingWeight));
    const pricePerUnit = new Decimal(price).div(weight);

    const selectedIndex = selected.findIndex(item => item.productInventoryId === productInventoryId);
    let newSelected = [];

    if (selectedIndex === -1) {
      if (fulfilled) {return}
      let selectedItem = {productInventoryId}

      let result = remainingWeightConverted.minus(notFulfilledWeight);

      let priceForProduct;
      if (result >= 0) {
        priceForProduct = notFulfilledWeight.mul(pricePerUnit);

        selectedItem.usedWeight = convert(orderMeasurementUnit, measurementUnit, notFulfilledWeight);
        notFulfilledWeight = new Decimal(0);
      } else {
        priceForProduct = remainingWeightConverted.mul(pricePerUnit);

        selectedItem.usedWeight = convert(orderMeasurementUnit, measurementUnit, remainingWeightConverted);
        notFulfilledWeight = new Decimal(Math.abs(result));
      }

      setTotalPrice(priceForProduct.plus(totalPrice).toDP(2));
      orderPrice = orderPrice.plus(priceForProduct);
      newSelected = newSelected.concat(selected, selectedItem);
    } else {
      const deletedItem = selected[selectedIndex]
      const deletedItemUsedWeightConverted = convert(measurementUnit, orderMeasurementUnit, new Decimal(deletedItem.usedWeight))
      const priceForProduct = deletedItemUsedWeightConverted.mul(pricePerUnit);

      setTotalPrice(new Decimal(totalPrice).minus(priceForProduct).toDP(2));
      orderPrice = orderPrice.minus(priceForProduct);
      notFulfilledWeight = notFulfilledWeight.plus(deletedItemUsedWeightConverted);

      if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    fulfilled = notFulfilledWeight.eq(0);

    setSelectedProducts((prev) => ({
      ...prev,
      [productTypeId]: {
        selected: newSelected,
        notFulfilledWeight: notFulfilledWeight,
        price: orderPrice.toDP(2),
        fulfilled: fulfilled,
        measurementUnit: orderMeasurementUnit,
      },
    }));
  };

  const handleRecipeSelected = async (event, recipe) => {
    setSelectedRecipe(recipe);
    const recipeDetails = recipe.recipeDetails.map((detail) => detail);

    try {
      setLoading(true);
      const productFetches = recipeDetails.map( async (detail)  => {
        const products = await getProductsByType(detail.productTypeId);
        return { [detail.productTypeId]: products };
      });

      const groupedProducts = Object.assign({}, ...await Promise.all(productFetches));
      setProductsByType(groupedProducts);

      const selectedProductsInit = {
        ...Object.fromEntries(
          recipeDetails.map((detail) => [
            detail.productTypeId,
            {
              selected: [],
              notFulfilledWeight: new Decimal(detail.weight),
              measurementUnit: detail.measurementUnit,
              price: new Decimal(0),
              fulfilled: false,
            }
          ])
        )
      };
      setSelectedProducts(selectedProductsInit)
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadAllRecipes = async () => {
      try {
        return await getAllRecipes()
      } catch (err) {
        console.log(err);
        setError("Failed to load recipes...");
      } finally {
        setLoading(false);
      }
    };

    loadAllRecipes().then(r => setRecipes(r));
  }, []);

  useEffect(() => {
    const result = Object.keys(selectedProducts).length > 0 && Object.entries(selectedProducts).every(([_, data]) => data.fulfilled);

    setIsOrderFulfilled(result);
  }, [selectedProducts]);

  return (
    <Container>
      <Typography variant="h3">Create order</Typography>
      <Typography variant="subtitle1">
        This is the Order page content.
      </Typography>
      <Autocomplete
        value={selectedRecipe}
        onChange={handleRecipeSelected}
        id="controllable-states-demo"
        getOptionLabel={(option) => option.name}
        options={recipes}
        sx={{ width: 300, paddingTop: 2 }}
        renderInput={(params) => <TextField {...params} label="Recipe" />}
      />
      <Box py={2}>
        {selectedRecipe &&
          selectedRecipe.recipeDetails.map((detail) => (
            <Accordion
              key={detail.productTypeId}
              expanded={expanded === detail.productTypeName}
              onChange={handleChange(detail.productTypeName)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  component="span"
                  sx={{ width: "33%", flexShrink: 0 }}
                >
                  {detail.productTypeName}
                </Typography>
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  {`Weight: ${detail.weight} (${detail.measurementUnit}) : ${selectedProducts[detail.productTypeId]?.notFulfilledWeight} - Price: ${selectedProducts[detail.productTypeId]?.price.toFixed(2) || 0}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <InventorySelectionTable
                  productTypeName={detail.productTypeName || ""}
                  rows={productsByType[detail.productTypeId] || []}
                  selectedProducts={selectedProducts[detail.productTypeId]?.selected || []}
                  fulfilled={selectedProducts[detail.productTypeId]?.fulfilled || false}
                  handleInventoryProductSelection={handleInventoryProductSelection}
                  headCells={headCells} />
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
      <Typography variant="subtitle1">
        {`Total price: ${totalPrice.toFixed(2)}`}
      </Typography>
      <Button variant="contained" onClick={handleSaveOrder} disabled={!isOrderFulfilled}>
        Save order
      </Button>
    </Container>
  );
};

export default AddOrder;
