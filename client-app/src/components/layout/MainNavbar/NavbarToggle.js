import React from "react";

import { Layout } from "../../../actions";
import { connect } from "react-redux";
const NavbarToggle = ({ toggleSidebar }) => {
  return (
    <nav className="nav">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        onClick={toggleSidebar}
        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
        style={{ fontSize: "1.2rem" }}
      >
        <i className="fas fa-bars"></i>
      </a>
    </nav>
  );
};
const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, {
  toggleSidebar: Layout.toggleSidebar,
})(NavbarToggle);
