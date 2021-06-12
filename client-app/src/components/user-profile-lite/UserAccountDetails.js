import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
  FormCheckbox,
} from "shards-react";
const UserAccountDetails = ({ user, onUpdateUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    // const updateUser = { props };

    if (user != undefined) {
      setUserId(user.id);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);
  const onSubimt = () => {
    if (userId != -1) {
      var userUpdate = {
        firstName: firstName || "",
        lastName: lastName || "",
        password: changePassword ? password || "" : "",
        email: email || "",
        phone: phone || "",
        idRole: -1,
        avatar: "",
        token: user.token,
      };
      console.log(userUpdate);
      onUpdateUser(userUpdate);
    }
  };
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Account Details</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Tên</label>
                    <FormInput
                      id="feFirstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Họ và tên đệm</label>
                    <FormInput
                      id="feLastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePhone">Số điện thoại</label>
                    <FormInput
                      id="fePhone"
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                <Button onClick={onSubimt} theme="accent">
                  Update Account
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default UserAccountDetails;
