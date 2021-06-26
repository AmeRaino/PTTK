import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Order } from "../../actions";
import { Link } from "react-router-dom";
import { ORDER_API_URL } from "../../api/constants";
function OrderDetail({
  currentProds,
  getAllProdInOrdDetail,
  idOrd,
  orders,
}) {
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(0);
  const [dataOrder, setOrder] = useState(null);
  const [data, setData] = useState(null);
  const axios = require("axios");
  useEffect(() => {
    getAllProdInOrdDetail(idOrd);
    async function getOrderDetail() {
      try {
        const response = await axios.get(
          `${ORDER_API_URL}/getorderdetailbyidord/${idOrd}`
        );
        console.log(response.data);
        if (response.data) {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
    getOrderDetail();
  }, []);


  return (
    <div>
    <main class="page">
      <section class="shopping-cart dark">
        <div class="container">
          <div class="content">
            {!loading && (
              <>
                <div class="row">
                  <div class="col-md-12 col-lg-8">
                    <div class="items">
                      {data.listDetails.map((item) => (
                        <Row item={item} />
                      ))}
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-4">
                    <div class="summary">
                      <h3>Tổng Đơn Hàng</h3>
                      <div class="summary-item"></div>
                      <div class="summary-item">
                        <span class="text">Tổng Tiền: </span>
                        <span class="price">{data.order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  </div>
);
}

const Row = ({ item }) => {
return (
  <div class="product">
    <div class="row">
      <div class="col-md-3">
        <img
          class="img-fluid mx-auto d-block image"
          style={{ height: "200px" }}
          src={item.avatar}
        />
      </div>
      <div class="col-md-8">
        <div class="info">
          <div class="row">
            <div class="col-md-5 product-name">
              <div class="product-name">
                <p>{item.name}</p>
                <div class="product-info">
                  <div>
                    Category: {item.categoryName}
                    <span class="value"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 quantity">
              <label for="quantity">Quantity: </label>
              <input
                id="quantity"
                type="number"
                value={item.quantity}
                class="form-control quantity-input"
              />
            </div>
            <div class="col-md-3 price">
              <span>{item.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
function mapStateToProps(store, props) {
  var id = props.match.params.id;
  return {
    idOrd: id,
    currentProds: store.orders.currentProds,
    orders: store.orders.orders.find((a) => a.id == id),
  };
}

export default connect(mapStateToProps, {
  getAllProdInOrdDetail: Order.getAllProdInOrdDetail,
})(OrderDetail);
