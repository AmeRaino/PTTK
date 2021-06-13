import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Order } from "../../actions";
import { Link } from "react-router-dom";

function OrderDetail({
  currentProds,
  getAllProdInOrdDetail,
  idOrd,
  orders,
}) {
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(0);
  const [idProduct, setIdProduct] = useState(null);
  const [dataOrder, setOrder] = useState(null);
  useEffect(() => {
    getAllProdInOrdDetail(idOrd);
  }, []);

  useEffect(() => {
    if (orders != undefined) {
      setOrder(orders);
      setLoading(false);
    }
  });


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
                        {currentProds.map(
                          (item) => (
                            row(item)
                          )
                        )}

                      </div>
                    </div>
                    <div class="col-md-12 col-lg-4">
                      <div class="summary">
                        <h3>Tổng Đơn Hàng</h3>
                        <div class="summary-item">
                          <span class="text">Tổng số bánh: {count} bánh</span>
                        </div>
                        <div class="summary-item">
                          <span class="text">Tổng Tiền:</span>
                          <span class="price">{dataOrder.total}</span>
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

const row = (item) => {
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
                  {/* <Link to={`/product-detail/${item.idProduct}`}> */}
                  <p>{item.name}</p>
                  {/* </Link> */}
                  <div class="product-info">
                    <div>
                      Category: {item.category.name}<span class="value"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 quantity">
                <label for="quantity">Quantity: </label>
                <input
                  id="quantity"
                  type="number"
                  value=""
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
