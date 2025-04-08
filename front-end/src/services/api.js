const baseUrl = import.meta.env.VITE_API_URL

export const getAllRecipes = async () => {
  const response = await fetch(`${baseUrl}/recipes`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
};

export const getAllProducts = async () => {
  const response = await fetch(`${baseUrl}/products`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const getAllProductsInventory = async () => {
  const response = await fetch(`${baseUrl}/inventory`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const addProductToInventory = async (data) => {
  const response = await fetch(`${baseUrl}/inventory`, {
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
  const response = await fetch(`${baseUrl}/products`, {
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
  const response = await fetch(`${baseUrl}/inventory/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const deleteProductById = async (id) => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getAllProductTypes = async () => {
  const response = await fetch(`${baseUrl}/products/types`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const saveRecipe = async (data) => {
  const response = await fetch(`${baseUrl}/recipes`, {
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
  const response = await fetch(`${baseUrl}/recipes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getAllOrders = async () => {
  const response = await fetch(`${baseUrl}/orders`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const deleteOrderById = async (id) => {
  const response = await fetch(`${baseUrl}/orders/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export const getProductsByType = async (productTypeId) => {
  const response = await fetch(`${baseUrl}/inventory?productTypeId=${productTypeId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return data
}

export const saveOrder = async (data) => {
  const response = await fetch(`${baseUrl}/orders`, {
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