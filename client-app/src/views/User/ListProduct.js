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


function ListProduct({ products, isFetching, getAllProducts, shouldFetchdata }) {
    return (
        <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <div>
          <Row noGutters className="page-header py-4">
          <h3 sm="4" className="text-sm-left">Sản Phẩm</h3>
          </Row>
          <div className="container-fluid">
            {!isFetching && (
              <div className="row">
                {products.map((product, index) => (
                  <ProductHomeRowItem
                    key={index}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    );
}

const mapStateToProps = (store) => {
    return {
      products: store.products.products,
      isFetching: store.products.isFetching,
      shouldFetchdata: store.products.shouldFetchdata,
    };
  };
  
  export default connect(mapStateToProps, {
    getAllProducts: Product.getAllProducts,
  })(ListProduct);
  