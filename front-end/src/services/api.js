const BASE_URL = "http://localhost:8080/api";

export const getAllRecipes = async () => {
  const response = await fetch(`${BASE_URL}/recipes`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
};

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const getAllProductsInventory = async () => {
  const response = await fetch(`${BASE_URL}/inventory`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const addProductToInventory = async (data) => {
  const response = await fetch(`${BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const saveProduct = async (data) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const deleteProductFromInventoryById = async (id) => {
  const response = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const deleteProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getAllProductTypes = async () => {
  const response = await fetch(`${BASE_URL}/products/types`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const saveRecipe = async (data) => {
  const response = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const deleteRecipeById = async (id) => {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getAllOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const deleteOrderById = async (id) => {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getProductsByType = async (productTypeId) => {
  const response = await fetch(`${BASE_URL}/inventory?productTypeId=${productTypeId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const saveOrder = async (data) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}