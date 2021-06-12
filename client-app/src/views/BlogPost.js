import React, { useState, useEffect } from "react";
import PageTitle from "../components/common/PageTitle";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "shards-react";
import { connect } from "react-redux";
import { Post } from "../actions";
import TableBlog from "../components/blog-post/TableBlog";
import RowBlog from "../components/blog-post/RowBlog";
import ModalAddNewBlog from "../components/blog-post/ModalAddNewBlog";
function BlogPost({
  posts,
  isFetching,
  shouldFetchdata,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}) {
  const [modalAddNewShow, setModalAddNewShow] = useState(false);
  const [postEdit, setPostEdit] = useState(null);
  useEffect(() => {
    if (shouldFetchdata) {
      getPosts();
    }
  }, [shouldFetchdata]);

  const onCreatePost = (post) => {
    createPost(post);
    setModalAddNewShow(false);
  };

  const onUpdatePost = (post) => {
    updatePost(post);
    setModalAddNewShow(false);
  };

  const onDelete = (id) => {
    deletePost(id);
  };

  const openModal = (index) => {
    if (index == -1) {
      setPostEdit(null);
    } else {
      setPostEdit(posts[index]);
    }
    setModalAddNewShow(true);
  };
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Quản lý bài viết"
          subtitle=""
          className="text-sm-left"
        />
        <Col sm={8} className="text-right align-self-end">
          <Button onClick={() => openModal(-1)}>
            <i className="fas fa-pen-square mr-2"></i>Tạo mới
          </Button>
          <ModalAddNewBlog
            show={modalAddNewShow}
            backdrop="static"
            size="lg"
            backdrop="static"
            onHide={() => setModalAddNewShow(false)}
            onCreatePost={(post) => onCreatePost(post)}
            onUpdatePost={(post) => onUpdatePost(post)}
            postEdit={postEdit}
          />
        </Col>
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Danh sách bài viết</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {!isFetching && (
                <TableBlog>
                  {posts.map((post, index) => (
                    <RowBlog
                      key={index}
                      post={post}
                      index={index}
                      onEdit={() => openModal(index)}
                      onDelete={() => onDelete(post.id)}
                    />
                  ))}
                </TableBlog>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
const selector = (store) => {
  return {
    posts: store.posts.posts,
    isFetching: store.posts.isFetching,
    shouldFetchdata: store.posts.shouldFetchdata,
  };
};
export default connect(selector, {
  getPosts: Post.getPosts,
  createPost: Post.createPost,
  updatePost: Post.updatePost,
  deletePost: Post.deletePost,
})(BlogPost);
