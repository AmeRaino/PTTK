import React from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const RowBlog = ({ index, post, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="align-middle">{index + 1}</td>
      <td className="align-middle">
        <Link className="mb-2" to={`/blog-post/${post.id}`}>
          {post.title}
        </Link>
      </td>
      <td className="align-middle">{post.authorName}</td>
      <td className="align-middle">
        {post.published
          ? moment(post.publishedDate).format("DD/MM/YYYY hh:mm") + " đã đăng"
          : moment(post.created).format("DD/MM/YYYY hh:mm") + " đã tạo"}
      </td>
      <td className="text-cente align-middle">
        <Button onClick={onEdit} className="btn-secondary mr-2">
          <i className="fas fa-wrench"></i>
        </Button>
        <Button onClick={onDelete} className="btn-danger mr-2">
          <i className="fas fa-minus-octagon"></i>
        </Button>
        <Link to={`/blog-post/${post.id}`} className="btn btn-info mr-2">
          <i className="fas fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
};

export default RowBlog;
