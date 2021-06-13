import React from "react";
import { Container, Row, Col, Card, CardBody, CardFooter } from "shards-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
const PostsListThree = [
  {
    author: "John James",
    authorAvatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/450px-Gull_portrait_ca_usa.jpg",
    title: "Had denoting properly jointure which well books beyond",
    body:
      "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
    date: "29 February 2019",
  },
  {
    author: "John James",
    authorAvatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/450px-Gull_portrait_ca_usa.jpg",
    title: "Husbands ask repeated resolved but laughter debating",
    body:
      "It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears...",
    date: "29 February 2019",
  },
  {
    author: "John James",
    authorAvatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/450px-Gull_portrait_ca_usa.jpg",
    title: "Instantly gentleman contained belonging exquisite now direction",
    body:
      "West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest merit checking railway...",
    date: "29 February 2019",
  },
];
const Overview = ({ notifications, isFetching }) => {
  return (
    <Container fluid className="main-content-container p-4">
      {isFetching !== 0 && (
        <Row>
          {notifications.map((post, idx) => (
            <Col lg="12" key={idx}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <p>
                    <TimeAgo date={post.date} />
                  </p>
                  <h5 className="card-title">{post.title}</h5>
                  <div
                    className="card-text text-muted"
                    dangerouslySetInnerHTML={{
                      __html: post.overView,
                    }}
                  ></div>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{
                        backgroundImage: `url('${post.authorAvatar}')`,
                      }}
                    ></a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.authorName}
                      </span>
                      <small className="text-muted">
                        {moment(post.date).format("DD/MM/YYYY hh:mm")}
                      </small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Link to={`/notification/${post.idNotification}`}>
                      <i className="far fa-eye mr-1" /> Xem thêm
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

const mapStateToProps = (store) => {
  return {
    notifications: store.notifications.notifications,
    isFetching: store.notifications.isFetching,
  };
};

export default connect(mapStateToProps)(Overview);
