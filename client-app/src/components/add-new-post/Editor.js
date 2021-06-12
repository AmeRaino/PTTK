import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.unprivilegedEditor = null;
    this.state = {
      title: "",
    };
  }
  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
    this.unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(
      this.quillRef
    );
  };

  getHtmlText = () => {
    return {
      title: this.state.title,
      body: this.unprivilegedEditor.getHTML(),
    };
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="Tiêu đề"
              onChange={this.handleChangeTitle}
            />
            <ReactQuill
              className="add-new-post__editor mb-1"
              ref={(el) => {
                this.reactQuillRef = el;
              }}
            />
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Editor;
