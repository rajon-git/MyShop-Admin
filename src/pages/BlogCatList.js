import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCat,
  deleteAbCategory,
  getBCategories,
} from "../features/bCategory/bcategorySlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Blog Category",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function BlogCatList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBCategories());
  }, []);
  const blogCatState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < blogCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCatState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCatState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBCategories());
    }, 500);
  };
  return (
    <div>
      <h3 className="mb-4">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Are you sure, want to delete this blog category?"
      />
    </div>
  );
}

export default BlogCatList;
