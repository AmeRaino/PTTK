import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function MainNavBar({ cart }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const logout = () => {
    sessionStorage.removeItem("endUserData");
    window.location.reload();
  };

  return (
    <div className="topnav">
      <Link to={`/home`}>
        <i className="fa fa-home"></i>
        Trang Chủ
      </Link>
      <Link to={`/order-history`}>
        <i className="fa fa-user"></i>
        Lịch sử đơn hàng
      </Link>
      <Link to={`/cart`}>
        <i className="fa fa-shopping-cart"></i>
        Giỏ Hàng
        <span class="badge badge-secondary badge-pill">{cartCount}</span>
      </Link>
      <a href="#" onClick={logout}>
        <i className="fa fa-sign-out-alt mr-2"></i>
        Đăng xuất
      </a>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    cart: store.products.cart,
  };
};

export default connect(mapStateToProps)(MainNavBar);
