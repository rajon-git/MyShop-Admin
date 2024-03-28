import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { createColor, getAColor, resetState, updateAColor } from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color Name is Required"),
});

function AddColor() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading,colorName, createdColor,updatedColor } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/admin/color-list");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading,createdColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h4 className="mb-4">
      {getColorId !== undefined ? "Edit" : "Add"} Color
      </h4>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
            type="color"
            label="Enter Color Name"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-3"
            type="submit"
          >
             {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddColor;
