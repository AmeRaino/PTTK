import React from "react";
import { Nav } from "shards-react";
import { connect } from "react-redux";
import SidebarNavItem from "./SidebarNavItem";

const SidebarNavItems = ({ navItems }) => {
  const { navItems: items } = navItems;
  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {navItems.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    navItems: store.layout.navItems,
  };
};

export default connect(mapStateToProps)(SidebarNavItems);
