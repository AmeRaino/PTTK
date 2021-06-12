import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import {
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
} from "shards-react";
import MyCKEditor from "../common/MyCKEditor";
import { uploadImage } from "../../actions/post";
import post from "../../api/post";
const ModalAddNewBlog = (props) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const inputRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    var post = props.postEdit;
    if (post != null) {
      setTitle(post.title || "");
      setImgSrc(post.imageCoverUrl || "");
      setContent(post.content || "");
      setDescription(post.description || "");
      setPublished(post.published || false);
    } else {
      setTitle("");
      setImgSrc("");
      setContent("");
      setDescription("");
      setPublished(false);
    }
    setLoading(false);
    return () => {
      // setTitle("");
      // setImgSrc("");
      // setContent("");
      // setDescription("");
      // setPublished(false);
    };
  }, [props.postEdit]);

  useEffect(() => {
    if (!selectedFile) {
      setImgSrc(undefined);
      return;
    }

    post.uploadImage(selectedFile).then((response) => {
      if (response.data) {
        setImgSrc(response.data.url);
      }
    });

    return () => {};
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const clickInput = () => {
    inputRef.current.click();
  };

  const onSubmit = () => {
    if (props.postEdit == null) {
      // create new
      var post = {
        title: title || "",
        imageCoverUrl: imgSrc || "",
        content: content || "",
        description: description || "",
        created: Date.now(),
        published: published || false,
      };
      props.onCreatePost(post);
    } else {
      // update
      var post = {
        id: props.postEdit.id,
        title: title || "",
        imageCoverUrl: imgSrc || "",
        content: content || "",
        description: description || "",
        modified: Date.now(),
        published: published || false,
      };
      console.log(post);
      props.onUpdatePost(post);
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={props.size}
      backdrop={props.backdrop}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* {props.title || "Thêm người dùng mới"} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading && (
          <Row>
            <Col>
              <Row>
                <Col sm="12" className="form-group">
                  <label htmlFor="feTitle">Tiêu đề</label>
                  <FormInput
                    id="feTitle"
                    placeholder="Tiêu đề bài viết"
                    value={title || ""}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" className="form-group">
                  <label>Ảnh bìa</label>
                  <Row>
                    <form>
                      <input
                        className="hidden"
                        type="file"
                        ref={inputRef}
                        name="user[image]"
                        onChange={onSelectFile}
                        accept="image/*"
                      />
                    </form>
                    <Col lg="9" md="6">
                      <FormInput
                        id="feImageUrl"
                        type="text"
                        placeholder="Đường dẫn"
                        value={imgSrc || ""}
                        onChange={(e) => {
                          setImgSrc(e.target.value);
                        }}
                      />
                    </Col>
                    <Col lg="3" md="6" className="text-right">
                      <Button className="btn-secondary" onClick={clickInput}>
                        <i className="fas fa-arrow-square-up mr-2"></i>Tải ảnh
                        lên
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Mô tả</label>
                  <FormTextarea
                    id="feDescription"
                    value={description || ""}
                    onChange={(e) => {
                      var data = e.target.value;
                      setDescription(data);
                    }}
                    rows="2"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" className="form-group">
                  <label>Nội dung</label>
                  <MyCKEditor
                    value={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                      console.log({ event, editor, data });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" className="form-check">
                  <FormCheckbox
                    defaultChecked={published}
                    onChange={() => {
                      setPublished(!published);
                    }}
                  >
                    Đang hoạt động
                  </FormCheckbox>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-secondary" onClick={props.onHide}>
          Hủy
        </Button>
        <Button onClick={onSubmit}>Lưu thông tin</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewBlog;
