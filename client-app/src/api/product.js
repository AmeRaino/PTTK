var Constants = require("./constants");
const axios = require("axios");

async function getProducts() {
  try {
    const response = await axios.get(`${Constants.PRODUCT_API_URL}`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function getProductById(id) {
  try {
    const response = await axios.get(`${Constants.PRODUCT_API_URL}/getproductbyid/${id}`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function getProductCategories() {
  try {
    const response = await axios.get(`${Constants.PRODUCT_API_URL}/getcategories`, {});
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function updateProduct(id, product) {
  try {
    const response = await axios.put(`${Constants.PRODUCT_API_URL}/${id}`, product);
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

async function insert(product) {
  try {
    const response = await axios.post(`${Constants.PRODUCT_API_URL}/addproduct`, {
      name: product.name,
      price: product.price,
      amount: product.amount,
      discount: product.discount,
      avatar: product.avatar,
      idCategory: product.idCategory,
    });
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

export default{
  getProducts,
  getProductById,
  getProductCategories,
  updateProduct,
  insert,
};