import React from "react";
import moment from "moment";
const DocumentRow = ({ index, doc }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <a href={doc.url}>{doc.title}</a>
      </td>
      <td>{doc.authorName}</td>
      <td>{moment(doc.modified).format("DD/MM/YYYY hh:mm")}</td>
    </tr>
  );
};

export default DocumentRow;
