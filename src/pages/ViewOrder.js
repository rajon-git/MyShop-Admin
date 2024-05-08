import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAOrder, getOrders } from "../features/auth/authSlice";
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
    title: "Status",
    dataIndex: "status",
  },
];

function ViewOrder() {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAOrder(orderId));
  }, [orderId]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      color: orderState?.orderItems[i]?.color?.title,
      amount: orderState?.orderItems[i]?.product?.price,
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
        <Table columns={columns} scroll={{ x: true }} dataSource={data1} />
      </div>
    </div>
  );
}

export default ViewOrder;
