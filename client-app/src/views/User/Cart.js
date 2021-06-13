import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createOrder } from "../../actions/order";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [shippingAdress, setShippingAdress] = useState("");

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += items * item.price;
    });

    setTotalItem(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItem, setTotalItem, setTotalPrice]);

  const checkOut = () => {
    var details = [];
    cart.forEach((item) => {
      details.push(item.id);
    });
    var order = {
      total: totalPrice || "",
      idCustomer: 1 || 0,
      shippingAdress: "",
      details: details,
      createdDate: null,
    };
    createOrder(order);
  };
  return (
    <div>
      <main class="page">
        <section class="shopping-cart dark">
          <div class="container">
            <div class="content">
              <div class="row">
                <div class="col-md-12 col-lg-8">
                  <div class="items">
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
                <div class="col-md-12 col-lg-4">
                  <div class="summary">
                    <h3>Tổng Giỏ Hàng</h3>
                    <div class="summary-item">
                      <span class="text">Tổng số bánh: {totalItem} bánh</span>
                    </div>
                    <div class="summary-item">
                      <span class="text">Tổng Tiền:</span>
                      <span class="price">{totalPrice}</span>
                    </div>
                    <Link to={`/checkout/`}>
                      <button
                        onClick={checkOut}
                        type="button"
                        class="btn btn-primary btn-lg btn-block">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.products.cart,
  };
};

export default connect(mapStateToProps)(Cart);
