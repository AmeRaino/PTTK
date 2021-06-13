import React, { useState, useEffect } from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllNotifications } from "../../../../actions/notification";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { NOTIFICATION_HUB_URL } from "../../../../api/constants";
import TimeAgo from "react-timeago";
const Notifications = ({
  notifications,
  isFetching,
  getAllNotifications,
  shouldFetch,
  unread,
}) => {
  const [visible, setVisible] = useState(false);
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    if (shouldFetch) {
      getAllNotifications();
    }
  });
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${NOTIFICATION_HUB_URL}`)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("NewNotification", (message) => {
            getAllNotifications();
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);
  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="nav-link-icon text-center"
        onClick={() => setVisible(!visible)}
      >
        <div className="nav-link-icon__wrapper" style={{ fontSize: "1.2rem" }}>
          <i className="fas fa-bell"></i>
          {unread > 0 && (
            <Badge pill theme="danger">
              {unread}
            </Badge>
          )}
        </div>
      </NavLink>
      {!isFetching && (
        <Collapse open={visible} className="dropdown-menu dropdown-menu-small">
          {notifications.map((data, index) => (
            <DropdownItem
              key={index}
              tag={Link}
              to={`/notification/${data.idNotification}`}
            >
              <div className="notification__icon-wrapper">
                <div className="notification__icon">
                  <div
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{
                      backgroundImage: `url('${data.authorAvatar}')`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="notification__content">
                <span className="notification__category">
                  {data.authorName}
                </span>
                <p className={`${data.isRead ? "" : "unread_message"}`}>
                  {data.title}
                </p>
                <p>
                  <TimeAgo date={data.date} />
                </p>
              </div>
              {!data.isRead && <span className="notification__note"> </span>}
            </DropdownItem>
          ))}
          <DropdownItem
            tag={Link}
            to="/"
            className="notification__all text-center"
          >
            View all Notifications
          </DropdownItem>
        </Collapse>
      )}
    </NavItem>
  );
};

const selector = (store) => {
  return {
    notifications: store.notifications.notifications,
    isFetching: store.notifications.isFetching,
    shouldFetch: store.notifications.shouldFetch,
    unread: store.notifications.unread,
  };
};
export default connect(selector, { getAllNotifications })(Notifications);
