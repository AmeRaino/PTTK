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
import { Link } from "react-router-dom";

const Cart = () => {
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);



  return (
    <div class="border-cart-page">
    <div class="small-container cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
         <tr>
                <td>
                    <div class="cart-info">
                        <img src="" alt=""/>
                        <div>
                            <p class="product-name">Product Name</p>
                            <small>30.000 đ</small>
                            <br/>
                            <button>
                                <a href="">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </a>
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="input-group inline-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-outline-secondary btn-minus">
                            <i class="fa fa-minus"></i>
                          </button>
                        </div>
                        <input class="form-control quantity" min="1" name="quantity" value="1" type="number"/>
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary btn-plus">
                            <i class="fa fa-plus"></i>
                          </button>
                        </div>
                    </div>
                </td>
                <td>30.000 đ</td>
            </tr>
        </table>

        <div class="total-price">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>30.000 </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Link to={`/checkout/`}><button>Checkout</button></Link>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
  );
}


export default Cart;
