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
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Quản lý sản phẩm"
          subtitle="Sản phẩm"
          className="text-sm-left"
        />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Danh sách đơn hàng</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Mã đơn hàng
                    </th>
                    <th scope="col" className="border-0">
                      Ngày đặt
                    </th>
                    <th scope="col" className="border-0">
                      Tổng cộng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
