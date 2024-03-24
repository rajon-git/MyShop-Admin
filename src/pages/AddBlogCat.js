import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createNewblogCat } from "../features/bCategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

function AddBlogCat() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createBlogCategory  } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createBlogCategory ) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createBlogCategory ]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createNewblogCat(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h4 className="mb-4">Add Blog Category</h4>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput  
            type="text"
            label="Enter Blog Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id ="blogcat" />
            <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-3"
            type="submit"
          >
            Add Blog Actegory
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlogCat;
