import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "images",
    render: (images) => (
      <img src={images[0]?.url} alt="Blog" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Bloglist() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      images: blogState[i]?.images,
      name: blogState[i]?.title,
      category: blogState[i]?.category,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 500);
  };
  return (
    <div>
      <h3 className="mb-4">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure, want to delete this blog?"
      />
    </div>
  );
}

export default Bloglist;
