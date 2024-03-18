import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async (user) => {
  const response = await axios.post(`${base_url}user/all-users`, user);
  return response.data;
};
const customerService = {
  getUsers,
};

export default customerService;
