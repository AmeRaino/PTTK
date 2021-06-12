import React from "react";
import PropTypes from "prop-types";

import MainNavBarUser from "../components/layout/MainNavBarUser/MainNavBar";

import { Container, Row, Col } from "shards-react";

function DefaultUser({ children }) {
  return (
    <div>
      <MainNavBarUser/>
      {children}
    </div>
  );
}

export default DefaultUser;
