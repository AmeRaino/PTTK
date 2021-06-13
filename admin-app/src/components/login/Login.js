import React from "react";
import { Container, Spinner } from "react-bootstrap";
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
  Button,
  FormFeedback,
} from "shards-react";
import { USERS_API_URL } from "../../api/constants";
const axios = require("axios");
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      invalidUsername: false,
      invalidPassword: false,
      invalidUsernameMessage: "",
      invalidPasswordMessage: "",
    };
  }

  async confirmLogin() {
    var username = this.state.username;
    var password = this.state.password;

    if (username !== "" && password !== "") {
      this.setState({
        loading: true,
        invalidUsername: false,
        invalidPassword: false,
      });

      try {
        const response = await axios.post(`${USERS_API_URL}/Authenticate`, {
          username: username,
          password: password,
        });
        console.log(response);
        this.props.handleLogin(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          this.setState({
            invalidUsername: true,
            invalidUsernameMessage: error.response.data.details,
            invalidPassword: true,
            invalidPasswordMessage: error.response.data.details,
            loading: false,
          });
        }
      }
    } else {
      this.setState({
        invalidUsername: username === "",
        invalidUsernameMessage: "Vui lòng nhập tên đăng nhập",
        invalidPassword: password === "",
        invalidPasswordMessage: "Vui lòng nhập mật khẩu",
        loading: false,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", (event) => {
      if (event.keyCode === 13 && !this.state.loading) {
        this.confirmLogin();
      }
    });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xl={6} lg={12} md={9}>
            <Card className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Đăng nhập</h1>
              </div>
              <Form>
                <FormGroup>
                  <label htmlFor="feUsername">Tên đăng nhập</label>
                  <FormInput
                    id="feUsername"
                    placeholder="nghia@abc.xyz"
                    onInput={(e) => this.setState({ username: e.target.value })}
                    required
                    invalid={this.state.invalidUsername}
                  />
                  <FormFeedback>
                    {this.state.invalidUsernameMessage}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="fePassword">Mật khẩu</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                    invalid={this.state.invalidPassword}
                  />
                  <FormFeedback>
                    {this.state.invalidPasswordMessage}
                  </FormFeedback>
                </FormGroup>
                {this.state.loading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="grow" variant="primary" />
                  </div>
                ) : (
                  <Button
                    className="btn-block"
                    theme="accent"
                    onClick={this.confirmLogin}
                  >
                    Đăng nhập
                  </Button>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
