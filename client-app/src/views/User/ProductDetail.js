import React, { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import { connect } from "react-redux";
import { Product } from "../../actions";
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
  const [input, setInput] = useState(1);

  useEffect(() => {
    if (product != undefined) {
      setData(product);
      setLoading(false);
    }
  });

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  }




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
                <h1 class="name-product">{data.name}</h1>
                <h3 class="price-product" style={{ color: "#F05D40" }}>
                  {data.price}đ
                </h3>
                <p class="product-detail">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                <label for="amount">{data.amount}</label>
                <div class="input-group inline-group">
                  <input id="quantity" type="number" min="1" max={data.amount} value={input} onChange={onChangeHandler} class="form-control quantity-input"/>
                </div>
                <div class="container">
                  <div class="row" style={{ paddingTop: "20px" }}>
                    <div class="col-sm-6">
                      <p class="add-to-cart">
                        <button id="add-cart" onClick={() => cart(data.id, input)}>
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                          Add to Cart
                        </button>
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
    cart: (id, value) => dispatch(Product.addToCart(id, value)),
  }
}
export default connect(mapToProps, mapDispatchToProps)(ProductDetail);
