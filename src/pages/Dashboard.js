import React, { useEffect, useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { Table } from "antd";
import { Column } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getYearlyData } from "../features/auth/authSlice";
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
  const [monthlyData,setMonthlyData] = useState([])
  const [monthlyDataSales,setMonthlyDataSales] = useState([])
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state)=>state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state)=>state?.auth?.yearlyData);

  useEffect(()=>{
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
  },[])

  useEffect(()=>{
    let monthNames= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let data =[]
    let monthlyOrderCount = []
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];

      data.push({type:monthNames[element?._id?.month],income:element?.amount});
      monthlyOrderCount.push({type:monthNames[element?._id?.month],sales:element?.count})
      
    }
    setMonthlyData(data);
    setMonthlyDataSales(monthlyOrderCount);
  },[])
  const config = {
    data:monthlyData,
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
    data:monthlyDataSales,
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
      <div className="d-flex justify-content-between gap-3 align-items-center">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1  bg-white p-3 rounded-3">
          <div>
            <p className="">Total Income</p>
            <h4 className="mb-0">$ {yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            <h6 className="red">
              {" "}
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Income in last year from today</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total Sales</p>
            <h4 className="mb-0">{yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column  align-items-end ">
            <h6 className="green">
              {" "}
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Sales in last year from today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-4">Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
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
