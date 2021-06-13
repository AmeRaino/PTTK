import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import { connect } from "react-redux";
const UserActions = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("adminData");
    window.location.reload();
  };

  return (
    <NavItem tag={Dropdown} caret toggle={() => setVisible(!visible)}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          height="40px"
          width="40px"
          className="user-avatar rounded-circle mr-2 center-cropped"
          src={`${user.avatar}`}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{user.firstName}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to="/user-profile">
          <i className="fal fa-user"></i> Profile
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/"
          onClick={logout}
          className="text-danger"
        >
          <i className="fal fa-sign-out"></i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};
const selector = (store) => {
  return {
    user: store.users.currentUser,
  };
};
export default connect(selector)(UserActions);
