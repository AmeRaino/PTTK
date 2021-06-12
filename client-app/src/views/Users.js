import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";
import moment from "moment";

import PageTitle from "../components/common/PageTitle";
import TableUsers from "../components/user-management/TableUsers";
import UserRow from "../components/user-management/UserRow";
import AddNewUserModal from "../components/user-management/AddNewUserModal";
import EditUserModal from "../components/user-management/EditUserModal";
import { connect } from "react-redux";
import { User } from "../actions";
const Users = ({
  users,
  isFetching,
  getAllUsers,
  removeUser,
  shouldFetchdata,
  setShouldFetchData,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [modalNewShow, setModalNewShow] = useState(false);
  const [modalEditShow, setEditModalShow] = useState(false);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [shouldFetchdata]);

  const handleDelete = (id) => {
    removeUser(id);
  };
  const handleEdit = (index) => {
    setSelectedUser(users[index]);
    setEditModalShow(true);
  };
  const onActionCompleted = (ok) => {
    if (ok) {
      setShouldFetchData(ok);
    }
  };
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Quản lý người dùng"
          subtitle="Người dùng"
          className="text-sm-left"
        />
        <Col sm={8} className="text-right align-self-end">
          <Button onClick={() => setModalNewShow(true)}>Thêm người dùng</Button>
          <AddNewUserModal
            show={modalNewShow}
            backdrop="static"
            onHide={() => setModalNewShow(false)}
            onCompleted={(bool) => onActionCompleted(bool)}
          />
        </Col>
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Danh sách người dùng</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {!isFetching && (
                <TableUsers>
                  {users.map((user, index) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      index={index}
                      onClickDelete={() => handleDelete(user.id)}
                      onClickEdit={() => handleEdit(index)}
                    />
                  ))}
                </TableUsers>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <EditUserModal
        show={modalEditShow}
        onHide={() => setEditModalShow(false)}
        user={selectedUser}
        updateuser={() => console.log("ngon")}
        onCompleted={(bool) => onActionCompleted(bool)}
      />
    </Container>
  );
};

const mapStateToProps = (store) => {
  return {
    users: store.users.users,
    isFetching: store.users.isFetching,
    shouldFetchdata: store.users.shouldFetchdata,
  };
};

export default connect(mapStateToProps, {
  removeUser: User.removeUser,
  getAllUsers: User.getAllUsers,
  setShouldFetchData: User.setShouldFetchData,
})(Users);
