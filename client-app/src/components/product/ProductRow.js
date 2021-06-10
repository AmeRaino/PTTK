import React from 'react';
import {
    Button,
} from "shards-react";

function ProductRow({ index, product, onClickEdit}) {
    return (
        <tr>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{product.category.name}</td>
            <td>{product.price}</td>
            <td>{product.amount}</td>
            <td><Button onClick={onClickEdit}>Chỉnh sửa</Button></td>
        </tr>
    );
}

export default ProductRow;