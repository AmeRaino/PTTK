import React, { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import { connect } from "react-redux";
import { Cart } from "../../actions";
import store from "../../store";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";

function ProductDetail({ product, cart }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (product != undefined) {
      setData(product);
      setLoading(false);
    }
  });




  return (
    <div class="card shadow-sm">
      <div class="container">
        <div class="row">
          {!loading && (
            <>
              <div class="col-sm-6">
                <img 
                  src={data.avatar}
                  style={{ width: "100%" }, {height: "400px"} }
                />
              </div>
              <div class="col-sm-6" style={{ textAlign: "left" }}>
                <h1 class="name-product">Donut</h1>
                <h3 class="price-product" style={{ color: "#F05D40" }}>
                  30.000 đ
                </h3>
                <p class="product-detail">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                <label for="amount">Quantity</label>
                <div class="input-group inline-group">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary btn-minus">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    class="form-control quantity"
                    min="1"
                    name="quantity"
                    value="1"
                    type="number"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary btn-plus">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="container">
                  <div class="row" style={{ paddingTop: "20px" }}>
                    <div class="col-sm-6">
                      <p class="add-to-cart">
                        <button id="add-cart" onClick={() => cart(data)}>
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                          Add to Cart
                        </button>
                      </p>
                    </div>
                    <div class="col-sm-6">
                      <p>
                        <button id="buy-now">Buy now</button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function mapToProps(store, props) {
  var id = props.match.params.id;
  return {
    product: store.products.products.find((a) => a.id == id),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    cart: (data) => dispatch(Cart.addToCart(data)),
  }
}
export default connect(mapToProps, mapDispatchToProps)(ProductDetail);
