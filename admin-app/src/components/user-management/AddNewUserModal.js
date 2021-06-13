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
import { registerUser, getUserRoles } from "../../actions/user";
var Constants = require("../../api/constants");
const axios = require("axios");

const AddNewUserModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    //get user roles data
    fetchUserRoleData();
  }, []);

  const fetchUserRoleData = () => {
    axios.get(`${Constants.USERS_API_URL}/getroles`, {}).then(
      (response) => {
        if (response.data) {
          setRoles(response.data);
          setLoadingRoles(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onSubmit = () => {
    if (username == "") {
      // handle username is null
      props.onHide();
      return;
    }

    if (password == "") {
      //
      props.onHide();
      return;
    }

    var user = {
      firstName: firstName || username,
      lastame: lastName || "",
      username: username || "",
      password: password || "",
      email: email || "",
      phone: phone || "",
      idRole: role,
    };
    registerUser(user);
    props.onCompleted(true);
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
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Tên</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Tên"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Họ và Tên đệm</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Họ và Tên đệm"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              {/* Email */}
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="dkjhkcjvb@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="fePhone">Số điện thoại</label>
                  <FormInput
                    id="fePhone"
                    placeholder="+84xxxxxxxxx"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <br></br>
              <div className="border-bottom"></div>
              <br></br>

              <Row form>
                {/* Username */}
                <Col md="12" className="form-group">
                  <label htmlFor="feUsername">Tên truy cập</label>
                  <FormInput
                    id="feUsername"
                    placeholder="Tên truy cập"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Password */}
                <Col md="12" className="form-group">
                  <label htmlFor="fePassword">Mật khẩu</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Mật khẩu"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="feInputRole">Vai trò</label>
                  <FormSelect
                    id="feInputRole"
                    value={role}
                    onChange={(something) => setRole(something.target.value)}
                  >
                    {!loadingRoles &&
                      roles.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                  </FormSelect>
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
};

export default AddNewUserModal;
