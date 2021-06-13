import React from "react";

const TableBlog = ({ children }) => (
  <table className="table mb-0">
    <thead className="bg-light">
      <tr>
        <th scope="col" className="border-0">
          #
        </th>
        <th scope="col" className="border-0">
          Tiêu đề
        </th>
        <th scope="col" className="border-0">
          Tác giả
        </th>
        <th scope="col" className="border-0">
          Ngày
        </th>
        <th scope="col" className="border-0"></th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default TableBlog;
