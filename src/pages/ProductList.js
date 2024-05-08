import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "images",
    render: (images) => (
      <img
        src={images[0]?.url}
        alt="Product"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data1 = productState.map((product, index) => ({
    key: index + 1,
    images: product.images,
    title: product.title,
    brand: product.brand,
    category: product.category,
    color: product.color,
    price: `${product.price}`,
    action: (
      <>
        <Link to={`/admin/product/${product._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(product._id)}
          >
            <AiFillDelete />
          </button>
        
      </>
    ),
  }));

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 500);
  };

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          scroll={{ x: true }}
          bordered
          responsive
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
          
        }}
        title="Are you sure, want to delete this brand?"
      />
    </div>
  );
};

export default Productlist;
