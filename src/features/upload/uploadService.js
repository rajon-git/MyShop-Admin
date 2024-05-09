import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data,  {
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
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
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

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;