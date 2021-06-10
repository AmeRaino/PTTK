import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { HOST } from "../../api/constants";
const axios = require("axios");
var Constants = require("../../api/constants");

function UpdateAvatarModal(props) {
  const [imgSrc, setImgSrc] = useState("");
  const inputRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectedFile) {
      setImgSrc(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImgSrc(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const clickInput = () => {
    inputRef.current.click();
  };

  const onSubmit = () => {
    props.onChange(selectedFile);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="input-group mb-3 px-2 py-2 rounded-0 bg-white border">
          <form>
            <input
              className="hidden"
              type="file"
              ref={inputRef}
              name="user[image]"
              onChange={onSelectFile}
              // accept="image/*"
            />
          </form>
          <label
            id="upload-label"
            className="font-weight-light text-muted rounded-0"
          ></label>
          <div className="input-group-append" onClick={clickInput}>
            <label className="btn btn-light m-0 rounded-pill px-4">
              <i className="fal fa-cloud-upload mr-2 text-muted"></i>
              <small className="text-uppercase font-weight-normal text-muted">
                Upload
              </small>
            </label>
          </div>
        </div>
        <div className="image-area mt-4">
          <img
            ref={imageRef}
            className="img-fluid rounded shadow-sm mx-auto d-block"
            src={imgSrc}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Cập nhật</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAvatarModal;
