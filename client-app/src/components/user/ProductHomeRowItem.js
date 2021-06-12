import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardLink,
  CardText,
  CardTitle,
  CardSubtitle,
} from "shards-react";
import { Link } from "react-router-dom";

function ProductHomeRowItem({ index, product }) {
  return (
    <div className="col-sm-3" style={{ marginTop: "20px" }}>
      <Link to={`/product-detail/${product.id}`}>
        <div class="card shadow-sm" style={{ width: "18rem" }}>
          <img
            src={product.avatar}
            class="card-img-top"
            style={{ witdth: "100%" }}
          />
          <div class="card-body">
            <p class="card-text">{product.name}</p>
            <h5 class="card-title">{product.price}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductHomeRowItem;
