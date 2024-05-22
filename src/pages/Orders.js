import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
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
    title: "After Discount Amount",
    dataIndex: "afteramount",
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
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders);
  const data = [];

  const updateOrderStatus = (id, status) => {
    dispatch(updateAOrder({ id, status }));
  };

  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name:
        orderState[i]?.user?.firstName + " " + orderState[i]?.user?.lastName,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i]?.totalPrice, // Adjusted as per your requirement
      afteramount: orderState[i]?.totalPriceAfterDiscount, // Adjusted as per your requirement
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <select
          name=""
          defaultValue={orderState[i]?.orderStatus}
          onChange={(e) =>
            updateOrderStatus(orderState[i]?._id, e.target.value)
          }
          className="form-control form-select"
        >
          <option value="ordered" disabled selected>
            Ordered
          </option>
          <option value="accept">Accept</option>
          <option value="cancel">Cancel</option>
          <option value="processed">Processed</option>
          <option value="shipped">Shipped</option>
          <option value="out for delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      ),
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="mb-4">Orders</h3>
          <div className="table-responsive">
            <Table columns={columns} scroll={{ x: true }} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
