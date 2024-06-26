import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`, bcat, {
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
const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, {
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

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategory/${blogCat.id}`,
    { title:blogCat.blogCatData.title },
    config
  );

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory
};

export default bCategoryService;
