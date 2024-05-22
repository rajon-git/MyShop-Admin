import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const createCoupons = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, {
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
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`,{
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

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, {
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

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
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

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, {
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
const couponService = {
  getCoupons,
  createCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon
};

export default couponService;
