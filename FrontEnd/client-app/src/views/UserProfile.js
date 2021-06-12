import React, { useState } from "react";
import { Container, Row, Col, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import UpdateAvatarModal from "../components/user-profile-lite/UpdateAvatarModal";
import { connect } from "react-redux";
import { updateCurrentUser, updateAvatarUser } from "../actions/user";
const UserProfile = ({ user, updateCurrentUser, updateAvatarUser }) => {
  const [modalAvatarShow, setModalAvatarShow] = useState(false);
  const onUpdateUser = (data) => {
    updateCurrentUser(user.id, data);
  };
  const onUpdateAvatar = (selectedFile) => {
    updateAvatarUser(user.id, selectedFile);
    setModalAvatarShow(false);
  };
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="User Profile"
          subtitle="Overview"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        <Col lg="4">
          <UserDetails
            user={user}
            onClickAvatar={() => setModalAvatarShow(true)}
          />
        </Col>
        <Col lg="8">
          <UserAccountDetails
            user={user}
            onUpdateUser={(data) => onUpdateUser(data)}
          />
        </Col>
      </Row>
      <UpdateAvatarModal
        show={modalAvatarShow}
        onHide={() => setModalAvatarShow(false)}
        onChange={(data) => onUpdateAvatar(data)}
      />
    </Container>
  );
};
const connector = (store) => {
  return {
    user: store.users.currentUser,
  };
};
export default connect(connector, { updateCurrentUser, updateAvatarUser })(
  UserProfile
);
