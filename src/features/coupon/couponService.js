import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const createCoupons = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);

  return response.data;
};
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`);
  return response.data;
};
const couponService = {
  getCoupons,
  createCoupons
};

export default couponService;