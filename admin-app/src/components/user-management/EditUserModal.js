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

var Constants = require("../../api/constants");
const axios = require("axios");

function EditUserModal(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    //get user roles data
    fetchUserRoleData();
    return () => {};
  }, []);

  useEffect(() => {
    // const updateUser = { props };

    if (props.user != undefined && props.user.role != undefined) {
      console.log(props.user.role);
      var user = props.user;
      setUserId(user.id);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole(user.role.id);
    }
  }, [props.user]);

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
    if (firstName == "" && lastName == "") {
      setFirstName(username);
    }
    if (userId != -1) {
      var user = {
        firstName: firstName || "",
        lastame: lastName || "",
        password: password || "",
        email: email || "",
        phone: phone || "",
        idRole: role,
        avatar: "",
      };
      axios.put(`${Constants.USERS_API_URL}/${userId}`, user).then(
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
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Tên</label>
                  <FormInput
                    id="feFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Họ và Tên đệm</label>
                  <FormInput
                    id="feLastName"
                    value={lastName}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="fePhone">Số điện thoại</label>
                  <FormInput
                    id="fePhone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    autoComplete="email"
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
                    value={username}
                    readOnly
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Col>
                <Col md="12" className="form-check">
                  <FormCheckbox
                    onChange={() => setChangePassword(!changePassword)}
                  >
                    Đổi mật khẩu
                  </FormCheckbox>
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
        <Button theme="secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Lưu thông tin</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
