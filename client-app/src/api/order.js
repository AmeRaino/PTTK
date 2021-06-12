var Constants = require("./constants");
const axios = require("axios");

async function getOrderByIdCus(id) {
    try {
      const response = await axios.get(`${Constants.ORDER_API_URL}/getorderbyidcus/${id}`, {});
      return response;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async function insert(order) {
    try {
      const response = await axios.post(`${Constants.ORDER_API_URL}/createorder`, {
        total: order.firstName,
        idCustomer: order.idCustomer,
        shippingAdress: order.shippingAdress,
        idCakes: order.details,
        createdDate: Date.now()
      });
      return response;
    } catch (error) {
      return error;
    }
    return null;
  }
  


export default{
    getOrderByIdCus,
    insert,
  };