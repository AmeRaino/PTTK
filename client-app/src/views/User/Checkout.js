import React, { useEffect, useState } from "react";
import ProductHomeRowItem from "../../components/user/ProductHomeRowItem";
import PageTitle from "../../components/common/PageTitle";
import IMGUSER from "../../images/user-img/index.js";
import { connect } from "react-redux";
import { Product } from "../../actions";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";

function Checkout(props) {
  return (
    <div class="check-out-form" style={{padding: "10px"}}>
      <div
        class="note"
        style={{textAlign: "center"}, {padding: "5px"}, {color: "#F05D40"}}
      >
        <h1>Check out form</h1>
        <h3 style={{borderBottom: "1px solid black"}}>
          Please make sure to check your address clearly
        </h3>
      </div>
      <div class="row">
        <div class="col-75">
          <div class="container">
            <form action="">
              <div class="row">
                <div class="col-50">
                  <h3 style={{color: "#F05D40"}}>Billing Address</h3>
                  <label for="fname">
                    <i class="fa fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <label for="email">
                    <i class="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                  <label for="adr">
                    <i class="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                  <label for="city">
                    <i class="fa fa-institution"></i> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                  />
                  <h3 style={{color: "#F05D40"}}>Payment</h3>
                  <h4>
                    <i class="fa fa-truck" aria-hidden="true"></i> Cash on
                    Delivery
                  </h4>
                  <input type="submit" value="Confirm" class="btn" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-25">
          <div class="container">
            <h3 style={{color: "#F05D40"}}>
              Cart{" "}
              <span class="price" style={{color: "black"}}>
                <i class="fa fa-shopping-cart"></i> <b>4</b>
              </span>
            </h3>
            <div class="product-detail">
              <div class="row">
                <div class="col-sm-4">
                  <p>Product 1</p>
                </div>
                <div class="col-sm-4">
                  <p>SL 1</p>
                </div>
                <div class="col-sm-4">
                  <p>Price 1</p>
                </div>
              </div>

              <hr />
              <p style={{color: "#F05D40"}}>
                Total{" "}
                <span class="price" style={{color: "#F05D40"}}>
                  <b>$30</b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
