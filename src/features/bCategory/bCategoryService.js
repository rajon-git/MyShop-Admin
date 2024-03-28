import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`, bcat, config);

  return response.data;
};
const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};

const getbCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);

  return response.data;
};

const updatebCategory = async (bCategory) => {
  const response = await axios.put(
    `${base_url}bCategory/${bCategory.id}`,
    { title: bCategory.bCategoryData.title },
    config
  );

  return response.data;
};

const deletebCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getbCategory,
  updatebCategory,
  deletebCategory
};

export default bCategoryService;
