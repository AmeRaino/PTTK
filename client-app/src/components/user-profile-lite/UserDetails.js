import React from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
} from "shards-react";
const UserDetails = ({ user, onClickAvatar }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle center-cropped"
          src={user.avatar}
          alt={user.firstName + " " + user.lastName}
          width="110"
          height="110"
          onClick={onClickAvatar}
        />
      </div>
      <h4 className="mb-0">{user.firstName + " " + user.lastName}</h4>
      <span className="text-muted d-block mb-2">{user.role.title}</span>
    </CardHeader>
  </Card>
);

export default UserDetails;
