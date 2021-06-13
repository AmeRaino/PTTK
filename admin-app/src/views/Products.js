import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import AddNewProductModal from "../components/product/AddNewProductModal";
import EditProductModal from "../components/product/EditProductModal";
import ProductTable from "../components/product/ProductTable";
import ProductRow from "../components/product/ProductRow";
import { connect } from "react-redux";
import { Product } from "../actions";
function Products({
  products,
  isFetching,
  getAllProducts,
  shouldFetchdata,
  setShouldFetchData,
}) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [modalNewShow, setModalNewShow] = useState(false);
  const [modalEditShow, setEditModalShow] = useState(false);
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [shouldFetchdata]);

  const handleEdit = (index) => {
    setSelectedProduct(products[index]);
    setEditModalShow(true);
  };
  const onActionCompleted = (ok) => {
    if (ok) {
      setShouldFetchData(ok);
    }
  };
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
        <Col sm={8} className="text-right align-self-end">
          <Button onClick={() => setModalNewShow(true)}>Thêm sản phẩm</Button>
          <AddNewProductModal
            show={modalNewShow}
            backdrop="static"
            onHide={() => setModalNewShow(false)}
            onCompleted={(bool) => onActionCompleted(bool)}
          />
        </Col>
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Danh sách sản phẩm</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {!isFetching && (
                <ProductTable>
                  {products.map((product, index) => (
                    <ProductRow
                      key={index}
                      product={product}
                      index={index}
                      onClickEdit={() => handleEdit(index)}
                    />
                  ))}
                </ProductTable>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <EditProductModal
        show={modalEditShow}
        onHide={() => setEditModalShow(false)}
        product={selectedProduct}
        updateproduct={() => console.log("ngon")}
        onCompleted={(bool) => onActionCompleted(bool)}
      />
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
  setShouldFetchData: Product.setShouldFetchData,
})(Products);
