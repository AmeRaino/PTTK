import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, DefaultUserLayout } from "./layouts";

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
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/overview" />,
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/write-notification",
    layout: DefaultLayout,
    component: AddNewPost,
  },
  {
    path: "/notification/:id",
    layout: DefaultLayout,
    component: NotificationDetail,
  },
  {
    path: "/document",
    layout: DefaultLayout,
    component: Documents,
  },
  {
    path: "/application",
    layout: DefaultLayout,
    component: Applications,
  },
  {
    path: "/user",
    layout: DefaultLayout,
    component: Users,
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile,
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPost,
  },
  {
    path: "/blog-post/:id",
    layout: DefaultLayout,
    component: PreviewPost,
  },
  {
    path: "/product",
    layout: DefaultLayout,
    component: Product,
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
    path: "/checkout",
    layout: DefaultUserLayout,
    component: Checkout,
  },
];
