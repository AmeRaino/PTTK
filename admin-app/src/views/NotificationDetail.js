import React, { useEffect, useState } from "react";
// import { Store, Actions } from "../flux-needToDelete";
import {
  getNotificationById,
  markNotifications,
} from "../utils/NotificationAPI";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
} from "shards-react";
import { connect, useSelector } from "react-redux";
import { Notification } from "../actions";
import moment from "moment";
import notifications from "../reducers/notifications";
const NotificationDetail = ({ match, markNotification, notifications }) => {
  const {
    params: { id },
  } = match;
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    markNotification(id, true);
  }, [id]);

  useEffect(() => {
    var found = notifications.find((a) => a.idNotification == id);
    if (found != undefined) {
      setNotification(found);
      setLoading(false);
    }
  }, [notifications]);

  return (
    <>
      {!loading && (
        <Container fluid className="bg-white py-4 px-5">
          <Row>
            <Col lg="12">
              <h5 className="card-title mb-1">{notification.title}</h5>
              <small className="text-muted">
                {moment(notification.date).format("DD/MM/YYYY hh:mm")}
              </small>
              <p
                className="mt-3 mb-3"
                dangerouslySetInnerHTML={{ __html: notification.body }}
              ></p>
              <div className="card-post__author d-flex">
                <a
                  href="#"
                  className="card-post__author-avatar card-post__author-avatar--small"
                  style={{
                    backgroundImage: `url('${notification.authorAvatar}')`,
                  }}
                ></a>
                <div className="d-flex flex-column justify-content-center ml-3">
                  <span className="card-post__author-name text-muted">
                    By
                    {notification.authorName}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
const selector = (store) => {
  // var {
  //   params: { id },
  // } = match;
  return {
    notifications: store.notifications.notifications,
  };
};
export default connect(selector, {
  markNotification: Notification.markNotification,
})(NotificationDetail);
