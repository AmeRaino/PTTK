import React from 'react';

function ProductTable({ children }) {
    return (
        <table className="table mb-0">
        <thead className="bg-light">
          <tr>
            <th scope="col" className="border-0">
              Ảnh
            </th>
            <th scope="col" className="border-0">
              Tên sản phẩm
            </th>
            <th scope="col" className="border-0">
              Danh mục
            </th>
            <th scope="col" className="border-0">
              Giá
            </th>
            <th scope="col" className="border-0">
              Tồn kho
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
}

export default ProductTable;