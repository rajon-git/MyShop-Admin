import React, { useEffect, useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { Table } from "antd";
import { Column } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";
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
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

function Dashboard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];

      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setMonthlyData(data);
    setMonthlyDataSales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < ordersState?.length; i++) {
      data1.push({
        key: i + 1,
        name:
          ordersState[i]?.user?.firstName +
          " " +
          ordersState[i]?.user?.lastName,
        product: ordersState[i]?.orderItems?.length,
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
      setOrderData(data1);
    }
  }, []);
  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
    label: {
      position: "top", // Position labels above bars
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: monthlyDataSales,
    xField: "type",
    yField: "sales",
    label: {
      position: "top", // Position labels above bars
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  

  return (
    <>
      <h3 className="mb-4">Dashboard</h3>
      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="d-flex p-3 justify-content-between align-items-end bg-white p-3 rounded-3">
            <div>
              <p className="">Total Income</p>
              <h4 className="mb-0">
                {yearlyDataState && yearlyDataState[0]?.amount} BDT
              </h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <FiArrowDownRight /> 32%
              </h6>
              <p className="mb-0">Income in last year from today</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="d-flex p-3 justify-content-between align-items-end bg-white p-3 rounded-3">
            <div>
              <p className="">Total Sales</p>
              <h4 className="mb-0">
                {yearlyDataState && yearlyDataState[0]?.count} Items
              </h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
                <FiArrowDownRight /> 32%
              </h6>
              <p className="mb-0">Sales in last year from today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="mt-4 flex-grow-1">
            <h3 className="mb-4">Income Statics</h3>
            <div>
              <Column {...config} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-3">
          <div className="mt-4 flex-grow-1">
            <h3 className="mb-4">Sales Statics</h3>
            <div>
              <Column {...config2} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-4">
          <h3 className="mb-4">Recent Orders</h3>
          <div className="table-responsive">
            <Table
              columns={columns}
              scroll={{ x: true }}
              dataSource={orderData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
