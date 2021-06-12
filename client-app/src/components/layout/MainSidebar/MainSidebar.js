import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";
import { toggleSidebar } from "../../../actions/layout";
import { connect } from "react-redux";
const MainSidebar = ({ menuVisible, hideLogoText }) => {
  const classes = classNames("main-sidebar", "px-0", "col-12");

  return (
    <Col
      tag="aside"
      className={`${classes} ${menuVisible && "open"}`}
      lg={{ size: 2 }}
      md={{ size: 3 }}
    >
      <SidebarMainNavbar hideLogoText={hideLogoText} />
      {/* <SidebarSearch /> */}
      <SidebarNavItems />
    </Col>
  );
};
const mapStateToProps = (store) => {
  return {
    menuVisible: store.layout.menuVisible,
    hideLogoText: false,
    sidebarNavItems: store.layout.navItems,
  };
};
export default connect(mapStateToProps, { toggleSidebar })(MainSidebar);
