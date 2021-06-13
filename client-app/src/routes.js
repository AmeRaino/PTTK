import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultUserLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import AddNewPost from "./views/AddNewPost";
import Users from "./views/Users";
import Documents from "./views/Documents";
import Applications from "./views/Applications";
import NotificationDetail from "./views/NotificationDetail";
import UserProfile from "./views/UserProfile";
import BlogPost from "./views/BlogPost";
import PreviewPost from "./views/PreviewPost";
import Product from "./views/Products";
import Home from "./views/User/Home";
import ProductDetail from "./views/User/ProductDetail";
import Cart from "./views/User/Cart";
import ListProduct from "./views/User/ListProduct";
import Checkout from "./views/User/Checkout";
import OrderDetail from "./views/User/OrderDetail";
import OrderAdmin from "./views/OrderAdmin";
import OrderAminDetail from "./views/OrderAdminDetail";
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultUserLayout,
    component: () => <Redirect to="/home" />,
  },
  {
    path: "/home",
    layout: DefaultUserLayout,
    component: Home,
  },
  {
    path: "/product-detail/:id",
    layout: DefaultUserLayout,
    component: ProductDetail,
  },
  {
    path: "/cart",
    layout: DefaultUserLayout,
    component: Cart,
  },
  {
    path: "/listproduct",
    layout: DefaultUserLayout,
    component: ListProduct,
  },
  {
    path: "/order-history",
    layout: DefaultUserLayout,
    component: Checkout,
  },
  {
    path: "/order-detail/:id",
    layout: DefaultUserLayout,
    component: OrderDetail,
  },
];
