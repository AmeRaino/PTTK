import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createOrder } from "../../actions/order";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { FormInput } from "shards-react";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [shippingAdress, setShippingAdress] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);

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
    if (shippingAdress != "") {
      setInvalidAddress(false);
      var details = [];
      cart.forEach((item) => {
        item.amount = item.qty;
        details.push(item);
      });
      var idUser = JSON.parse(sessionStorage.getItem("endUserData"))
        ? JSON.parse(sessionStorage.getItem("endUserData"))
        : "0";
      var order = {
        total: totalPrice || "",
        idCustomer: idUser.username,
        shippingAdress: shippingAdress,
        details: details,
        createdDate: null,
      };
      createOrder(order);
    } else {
      setInvalidAddress(true);
    }
  };

  const ConditionalLink = ({ children, to, condition }) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;
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
                    <FormInput
                      id="feAddress"
                      placeholder="dia chi"
                      onInput={(e) => setShippingAdress(e.target.value)}
                      required
                      invalid={invalidAddress}
                    />
                    <div class="summary-item">
                      <span class="text">Tổng số bánh: {totalItem} bánh</span>
                    </div>
                    <div class="summary-item">
                      <span class="text">Tổng Tiền:</span>
                      <span class="price">{totalPrice}</span>
                    </div>

                    <ConditionalLink to="/order-history" condition={shippingAdress != ""}>
                      <button
                        onClick={checkOut}
                        type="button"
                        class="btn btn-primary btn-lg btn-block"
                      >
                        Checkout
                      </button>
                    </ConditionalLink>
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
