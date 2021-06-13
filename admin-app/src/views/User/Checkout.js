import React, { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import { connect } from "react-redux";
import { Order } from "../../actions";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import moment from "moment";
import { Link } from "react-router-dom";

function Checkout({ orders, getOrderByIdCus }) {
  useEffect(() => {
    getOrderByIdCus(1);
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách đơn hàng" className="text-sm-left" />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
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
                <tbody>{orders.map((item) => row(item))}</tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const row = (item) => {
  return (
    <tr>
       <Link to={`/order-detail/${item.id}`}>
      <td>{item.id}</td>
      </Link>
      <td>{moment(item.createdDate).format("DD/MM/YYYY hh:mm")}</td>
      <td>{item.total}</td>
    </tr>
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders.orders,
  };
};

export default connect(mapStateToProps, {
  getOrderByIdCus: Order.getOrderByIdCus,
})(Checkout);
