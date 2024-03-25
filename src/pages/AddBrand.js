import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { createBrand, getABrand, resetState } from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

function AddBrand() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const pathnameParts = pathname.split("/");
const getBrandId = pathnameParts.length >= 4 ? pathnameParts[3] : null;;
  const newBrand = useSelector((state) => state.brand);
const { isSuccess, isError, isLoading, createdBrand,brandName } = newBrand;
useEffect(() => {
  if (getBrandId !== undefined) {
    dispatch(getABrand(getBrandId));
    formik.values.title = brandName;
  } else {
    dispatch(resetState());
  }
}, [getBrandId]);

 
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h4 className="mb-4">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h4>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand name"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id ="brand"
          />
           <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-3"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
