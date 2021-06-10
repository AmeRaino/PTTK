import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";
import { connect } from "react-redux";
import Interweave from "interweave";
import moment from "moment";
function PreviewPost({ post }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (post != undefined) {
      setData(post);
      setLoading(false);
    }
  });
  return (
    <Container fluid className="bg-white py-4 px-5 h-100">
      <Row>
        <Col lg="12">
          {!loading && (
            <>
              <p>{`Người tạo: ${data.authorName} | ${moment(
                post.created
              ).format("DD/MM/YYYY hh:mm")}`}</p>
              <h1>
                <strong>{data.title}</strong>
              </h1>
              <Interweave
                content={`<p><strong>${data.description}</strong></p>`}
              />
              <Interweave content={data.content} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
function mapToProps(store, props) {
  console.log(props.match.params);
  var id = props.match.params.id;
  console.log(store.posts.posts);
  return {
    post: store.posts.posts.find((a) => a.id == id),
  };
}
export default connect(mapToProps)(PreviewPost);
