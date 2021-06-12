import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";
import { toggleSidebar } from "../../../actions/layout";
import { connect } from "react-redux";

const SidebarMainNavbar = ({ toggleSidebar, hideLogoText }) => {
  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 mr-0"
          href="#"
          style={{ lineHeight: "25px" }}
        >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: "30px" }}
              src={require("../../../images/shards-dashboards-logo.svg")}
              alt="Dashboard"
            />
            {!hideLogoText && (
              <span className="d-none d-md-inline ml-1">Dashboard</span>
            )}
          </div>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={toggleSidebar}
        >
          {/* <i className="material-icons">&#xE5C4;</i> */}
          <i className="fal fa-times"></i>
        </a>
      </Navbar>
    </div>
  );
};

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
};

const mapStateToProps = (store) => {
  return {
    hideLogoText: false,
  };
};

export default connect(mapStateToProps, { toggleSidebar })(SidebarMainNavbar);
