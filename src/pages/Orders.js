import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Customer",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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
    title: "Action",
    dataIndex: "action",
  },
];

function Orders() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrders())
  },[dispatch]);
  const orderState = useSelector((state)=> state?.auth?.orders);
  const data1 = [];
for (let i = 0; i < orderState.length; i++) {
  data1.push({
    key: i+1,
    name: orderState[i]?.user?.firstName+" "+orderState[i]?.user?.lastName,
    product: <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>,
    amount: orderState[i]?.totalPrice,
    date: new Date(orderState[i].createdAt).toLocaleString(),
    action: (
      <>
        <select name="" className="form-control form-select" id="">
          <option value="ordered" disabled selected>Ordered</option>
          <option value="accept">Accept</option>
          <option value="cancel">Cancel</option>
          <option value="processed">Processed</option>
          <option value="shipped">Shipped</option>
          <option value="out for delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </>
    ),
  });
}
  return (
    <div>
      <h3 className="mb-4">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default Orders;
