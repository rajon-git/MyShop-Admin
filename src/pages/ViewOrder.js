import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];


function ViewOrder() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[3]
  useEffect(()=>{
    dispatch(getOrderByUser(userId))
  },[userId]);
  const orderState = useSelector((state)=> state.auth.orderbyuser.products);
  const data1 = [];
for (let i = 0; i < orderState.length; i++) {
  data1.push({
    key: i,
    name: orderState[i].product.title,
    brand: orderState[i].product.brand,
    // product: orderState[i].products.map((i,j)=>{
    //   return i.product.title
    // }),
    count: orderState[i].product.count,
    Color: orderState[i].product.color,
    amount: orderState[i].product.price,
    date: orderState[i].product.createdAt,
    action: (
      <>
        <Link to="/" className=" fs-3 text-danger">
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-3 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    ),
  });
}
  return (
    <div>
      <h3 className="mb-4">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default ViewOrder;
