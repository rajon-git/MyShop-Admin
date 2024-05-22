import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig";

const createProducts = async(product)=> {
    const response = await axios.post(`${base_url}product/`,product,
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
}

const getProducts = async()=> {
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const deleteProduct = async(id)=> {
    const response = await axios.delete(`${base_url}product/${id}`,{
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
}

const getProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`,  {
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

const updateProduct = async (product) => {
    const response = await axios.put(
      `${base_url}product/${product.id}`,
      { title: product.productData.title,
        description: product.productData.description,
        price: product.productData.price,
        brand: product.productData.brand,
        category: product.productData.category,
        tags: product.productData.tags,
        quantity: product.productData.quantity,
        images: product.productData.images },
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

const productService = {
    getProducts,
    createProducts,
    deleteProduct,
    updateProduct,
    getProduct
}

export default productService;