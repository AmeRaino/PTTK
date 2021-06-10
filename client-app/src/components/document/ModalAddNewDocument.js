import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAddNewDocument(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    ></Modal>
  );
}

export default ModalAddNewDocument;
