import axios from 'axios';

// Reemplaza esta URL con la URL de tu backend en Azure
const API_URL = 'https://backinventario-f0b7h6atangaeacm.eastus-01.azurewebsites.net/products/';

export async function createProduct(productData) {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error("Error al crear producto");
  }
}

export async function getAllProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("Error al obtener productos");
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Producto no encontrado:", error);
    throw new Error('Producto no encontrado');
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await axios.put(`${API_URL}${id}/`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw new Error('Error al actualizar producto');
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.status;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error('Error al eliminar producto');
  }
}

export async function updateProductStock(productId, newStock, originalProduct) {
  try {
    const updatedProduct = {
      ...originalProduct,
      stock_quantity: newStock,
      expiration_date: originalProduct.expiration_date || null, // Aseguramos que esté definido
    };

    const response = await axios.put(`${API_URL}${productId}/`, updatedProduct);
    return response.data;  // Retornamos la respuesta actualizada
  } catch (error) {
    if (error.response) {
      console.error("Error detallado del backend:", error.response.data);
    } else if (error.request) {
      console.error("No hubo respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw new Error("Error al actualizar producto");
  }
}
