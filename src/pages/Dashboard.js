import React from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { Table } from "antd";
import { Column } from "@ant-design/plots";
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
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

function Dashboard() {
  const data = [
    {
      type: "Jan",
      sales: 5,
    },
    {
      type: "Feb",
      sales: 55,
    },
    {
      type: "Mar",
      sales: 25,
    },
    {
      type: "Apr",
      sales: 45,
    },
    {
      type: "May",
      sales: 45,
    },
    {
      type: "Jun",
      sales: 45,
    },
    {
      type: "July",
      sales: 35,
    },
    {
      type: "Aug",
      sales: 15,
    },
    {
      type: "Sep",
      sales: 3,
    },
    {
      type: "Oct",
      sales: 3,
    },
    {
      type: "Nov",
      sales: 3,
    },
    {
      type: "Dec",
      sales: 3,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "top", // Position labels above bars
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
      formatter: (sales) => `${sales}`, // Format label content as desired
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

  return (
    <>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between gap-3 align-items-center">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total: </p>
            <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            <h6>
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to April,2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1  bg-white p-3 rounded-3">
          <div>
            <p className="">Total: </p>
            <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            <h6 className="red">
              {" "}
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to April,2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total: </p>
            <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            <h6 className="green">
              {" "}
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to April,2024</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
