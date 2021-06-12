import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
// import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";
import ReactQuill, { Quill } from "react-quill";
import { publicNotification } from "../actions/notification";
import MyCKEditor from "../components/common/MyCKEditor";

const AddNewPost = () => {
  const [editorRef, setEditorRef] = useState(null);

  const attachEditorRef = () => {};
  const onPublish = () => {
    var result = editorRef.getHtmlText();
    publicNotification(result.title, result.body);
  };

  const config = {};
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Viết thông báo mới"
          subtitle="Thông báo"
          className="text-sm-left"
        />
      </Row>

      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <MyCKEditor
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <SidebarActions onPublish={onPublish} />
          {/* <SidebarCategories /> */}
        </Col>
      </Row>
    </Container>
  );
};
export default AddNewPost;
