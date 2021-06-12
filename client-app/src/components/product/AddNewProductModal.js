import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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
} from "shards-react";
import { addProduct } from "../../actions/product";
var Constants = require("../../api/constants");
const axios = require("axios");

function AddNewProductModal(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(-1);
  const [amount, setAmount] = useState(-1);
  const [avatar, setAvatar] = useState("");
  const [discount, setDiscount] = useState(-1);
  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);


  useEffect(() => {
    //get user roles data
    fetchProductCategoryData();
    return () => {};
  }, []);


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
    if (price > -1 && amount > -1) {
      var product = {
        name: name || "",
        price: price || 0,
        amount: amount || 0,
        discount: discount || 0,
        idCategory: category,
        avatar: "",
      };
      addProduct(product);
      props.onCompleted(true);
      props.onHide();
    }

    props.onHide();
  };  

  
    return (
        <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop={props.backdrop}
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
                      placeholder="Tên sản phẩm"
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
                      onChange={(something) => setCategory(something.target.value)}
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
                      placeholder="Giá"
                      onChange={(e) => {
                        setPrice(parseFloat(e.target.value));
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
                      placeholder="Hàng tồn"
                      onChange={(e) => {
                        setAmount(parseInt(e.target.value));
                      }}
                    />
                  </Col>
                </Row>
              </Form>
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

export default AddNewProductModal;