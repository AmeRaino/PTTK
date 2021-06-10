import React from "react";

const TableUsers = ({ children }) => (
  <table className="table mb-0">
    <thead className="bg-light">
      <tr>
        <th scope="col" className="border-0">
          #
        </th>
        <th scope="col" className="border-0">
          Hành động
        </th>
        <th scope="col" className="border-0">
          Tên truy cập
        </th>
        <th scope="col" className="border-0">
          Tên
        </th>
        <th scope="col" className="border-0">
          Vai trò
        </th>
        <th scope="col" className="border-0">
          Email
        </th>
        <th scope="col" className="border-0">
          Thời gian tạo mới
        </th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

// TableUsers.propTypes = {
//   children: PropTypes.node,
// };

export default TableUsers;
