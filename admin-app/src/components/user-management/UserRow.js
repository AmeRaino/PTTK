import React, { useState } from "react";
import {
  InputGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "shards-react";
import moment from "moment";
const UserRow = ({ index, user, onClickEdit, onClickDelete }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <InputGroup>
          <Dropdown open={dropdown} toggle={() => setDropdown(!dropdown)}>
            <DropdownToggle>Hành động</DropdownToggle>
            <DropdownMenu small right>
              <DropdownItem onClick={onClickEdit}>Chỉnh sửa</DropdownItem>
              <DropdownItem onClick={onClickDelete}>Xóa bỏ</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroup>
      </td>
      <td>{user.username}</td>
      <td>{user.firstName}</td>
      <td>{user.role.title}</td>
      <td>{user.email}</td>
      <td>{moment(user.createdDate).format("DD/MM/YYYY hh:mm")}</td>
    </tr>
  );
};

export default UserRow;
