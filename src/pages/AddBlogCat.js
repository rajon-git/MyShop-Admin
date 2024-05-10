import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createNewblogCat,
  getAbCategory,
  resetState,
  updateAbCategory,
} from "../features/bCategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

function AddBlogCat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatID = location.pathname.split("/")[3];

  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    updatedBlogCategory,
    blogCatName,
    createBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatID !== undefined) {
      dispatch(getAbCategory(getBlogCatID));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatID]);
  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createBlogCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatID, blogCatData: values };
      if (getBlogCatID !== undefined) {
        dispatch(updateAbCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  return (
    <div>
      <h4 className="mb-4">
        {getBlogCatID !== undefined ? "Edit" : "Add"} Blog Category
      </h4>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-3"
            type="submit"
          >
            {getBlogCatID !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlogCat;
