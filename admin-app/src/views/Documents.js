import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Document } from "../actions";
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
import DocumentRow from "../components/document/DocumentRow";
// import { ModalAddNewDocument } from "../components/document/ModalAddNewDocument";
import TableDocument from "../components/document/TableDocument";
const Documents = ({
  documents,
  isFetching,
  shouldFetch,
  getAllDocuments,
  insertDocument,
}) => {
  useEffect(() => {
    getAllDocuments();
  }, [shouldFetch]);
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Quản lý tài liệu"
          subtitle="Tài liệu"
          className="text-sm-left"
        />
        {/* <Col sm={8} className="text-right align-self-end">
          <Button onClick={() => setModalNewShow(true)}>Thêm người dùng</Button>
          <AddNewUserModal
            show={modalNewShow}
            backdrop="static"
            onHide={() => setModalNewShow(false)}
            onCompleted={(bool) => onActionCompleted(bool)}
          />
        </Col> */}
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Danh sách tài liệu</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {!isFetching && (
                <TableDocument>
                  {documents.map((doc, index) => (
                    <DocumentRow key={index} doc={doc} index={index} />
                  ))}
                </TableDocument>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
const selector = (store) => {
  return {
    documents: store.documents.documents,
    isFetching: store.documents.isFetching,
    shouldFetch: store.documents.shouldFetch,
  };
};
export default connect(selector, {
  getAllDocuments: Document.getAllDocuments,
  insertDocument: Document.insertDocument,
})(Documents);
