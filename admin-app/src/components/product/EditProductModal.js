import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  Button,
} from "shards-react";
import product from "../../api/product";

var Constants = require("../../api/constants");
const axios = require("axios");

function EditProductModal(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(-1);
  const [amount, setAmount] = useState(-1);
  const [avatar, setAvatar] = useState("");
  const [discount, setDiscount] = useState(-1);
  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [productID, setProductID] = useState(-1);

  /* upload image */

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
    uploadFileImage(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImgSrc(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const clickInput = () => {
    inputRef.current.click();
  };

  async function uploadFileImage(file) {
    const response = product.uploadImage(file).then((response) => {
      console.log(response);
      if (response.data) {
        setAvatar(response.data.url);
      }
    });
  }

  /*end upload image*/

  useEffect(() => {
    //get user roles data
    fetchProductCategoryData();
    return () => {};
  }, []);

  useEffect(() => {
    // const updateUser = { props };

    if (props.product != undefined && props.product.category != undefined) {
      console.log(props.product.category);
      var product = props.product;
      setProductID(product.id);
      setName(product.name || "");
      setPrice(product.price || "");
      setAmount(product.amount || "");
      setAvatar(product.avatar || "");
      setDiscount(product.discount || "");
      setCategory(product.category.id);
      setImgSrc(product.avatar);
    }
  }, [props.product]);

  const fetchProductCategoryData = () => {
    axios.get(`${Constants.PRODUCT_API_URL}/getcategories`, {}).then(
      (response) => {
        if (response.data) {
          setCategories(response.data);
          setLoadingCategories(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onSubmit = () => {
    if (productID != -1 && price != -1 && amount != -1 && discount != -1) {
      var product = {
        name: name || "",
        price: price || 0,
        amount: amount || 0,
        discount: discount || 0,
        idcategory: category,
        avatar: "",
      };
      axios.put(`${Constants.PRODUCT_API_URL}/${productID}`, product).then(
        (response) => {
          if (response.status == 200) {
            props.onCompleted(true);
          }
        },
        (error) => {
          console.log(error);
          props.onCompleted(false);
        }
      );
    }

    props.onHide();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* {props.title || "Thêm người dùng mới"} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* Productname */}
                <Col md="12" className="form-group">
                  <label htmlFor="feProductname">Tên sản phẩm</label>
                  <FormInput
                    id="feProductname"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="feCategory">Danh mục</label>
                  <FormSelect
                    id="feCategory"
                    value={category}
                    onChange={(something) =>
                      setCategory(something.target.value)
                    }
                  >
                    {!loadingCategories &&
                      categories.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row form>
                {/* Price */}
                <Col md="12" className="form-group">
                  <label htmlFor="fePrice">Giá</label>
                  <FormInput
                    id="fePrice"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Amount */}
                <Col md="12" className="form-group">
                  <label htmlFor="feAmount">Hàng tồn</label>
                  <FormInput
                    id="feAmount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="form-group">
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
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Lưu thông tin</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;
