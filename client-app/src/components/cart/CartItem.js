import React from 'react';
import { connect } from "react-redux";
import { Product } from "../../actions";
import { Link } from "react-router-dom";

function CartItem({ item, removeFromCart }) {
    return (
        <div class="product">
        <div class="row">
            <div class="col-md-3">
                <img class="img-fluid mx-auto d-block image" style={{height: "200px"}} src={item.avatar}/>
            </div>
            <div class="col-md-8">
                <div class="info">
                    <div class="row">
                        <div class="col-md-5 product-name">
                            <div class="product-name">
                            <Link to={`/product-detail/${item.id}`}>
                                <p>{item.name}</p>
                            </Link>
                            <div class="product-info">
                                    <div>Category: <span class="value">{item.category.name}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 quantity">
                            <label for="quantity">Quantity:</label>
                            <input id="quantity" type="number" value ={item.qty} class="form-control quantity-input"/>
                        </div>
                        <div class="col-md-3 price">
                            <span>{item.price}</span>
                            <br/>
                            <br/>
                            <br/>
                            <button onClick={() => removeFromCart(item.id)} style={{background: "none"}, {border: "0.5px"}}>
         Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
      removeFromCart: (id) => dispatch(Product.removeFromCart(id)),
    }
  }
  export default connect(null, mapDispatchToProps)(CartItem);