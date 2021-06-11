import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function MainNavBar({cart}) {
// const [cartCount, setCartCount] = useState(0);

// useEffect(() => {
//   let count = 0;
//   cart.forEach(item => {
//     count += item.quantity;
//   });
// }), [cart, cartCount]


  return (
    <div className="topnav">
      <Link to={`/home`}>
        <i className="fa fa-home"></i>
        Trang Chủ
      </Link>
      <Link to={`#`}>
        <i className="fa fa-user"></i>
        Tài Khoản
      </Link>
      <Link to={`/cart`}>
        <i className="fa fa-shopping-cart"></i>
        Giỏ Hàng
      </Link>
      <div className="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainNavBar;
