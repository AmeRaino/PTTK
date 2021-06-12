import React from "react";

const TableDocument = ({ children }) => (
  <table className="table mb-0">
    <thead className="bg-light">
      <tr>
        <th scope="col" className="border-0">
          #
        </th>
        <th scope="col" className="border-0">
          Tệp
        </th>
        <th scope="col" className="border-0">
          Người đăng
        </th>
        <th scope="col" className="border-0">
          Ngày đăng
        </th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default TableDocument;
