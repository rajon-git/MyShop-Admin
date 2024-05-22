import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  const response = await axios.get(`${base_url}user/getallorders`, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("user") !== null
          ? JSON.parse(localStorage.getItem("user")).token
          : ""
      }`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaOrder/${id}`, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("user") !== null
          ? JSON.parse(localStorage.getItem("user")).token
          : ""
      }`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const getMonthlyOrder = async () => {
  const response = await axios.get(`${base_url}user/getMonthWiseOrderIncome`, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("user") !== null
          ? JSON.parse(localStorage.getItem("user")).token
          : ""
      }`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const getYearlyOrders = async () => {
  const response = await axios.get(`${base_url}user/getYearlyTotalIncome`, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("user") !== null
          ? JSON.parse(localStorage.getItem("user")).token
          : ""
      }`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorder/${data.id}`,
    { status: data.status },
    {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user")).token
            : ""
        }`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrder,
  getYearlyOrders,
  updateOrder,
};

export default authService;
