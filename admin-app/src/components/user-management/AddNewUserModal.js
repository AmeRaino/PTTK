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
          {/* {props.title || "Th??m ng?????i d??ng m???i"} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">T??n</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="T??n"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">H??? v?? T??n ?????m</label>
                  <FormInput
                    id="feLastName"
                    placeholder="H??? v?? T??n ?????m"
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
                  <label htmlFor="fePhone">S??? ??i???n tho???i</label>
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
                  <label htmlFor="feUsername">T??n truy c???p</label>
                  <FormInput
                    id="feUsername"
                    placeholder="T??n truy c???p"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Password */}
                <Col md="12" className="form-group">
                  <label htmlFor="fePassword">M???t kh???u</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="M???t kh???u"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="feInputRole">Vai tr??</label>
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
          H???y
        </Button>
        <Button onClick={onSubmit}>L??u th??ng tin</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewUserModal;
