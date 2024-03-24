import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createCategory, resetState } from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h4 className="mb-4">Add Category</h4>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="category"
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            className="btn btn-success rounded-3 border-0 my-3"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
