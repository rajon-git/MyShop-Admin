import React, { useEffect, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlogs, getABlog, resetState, updateABlog } from "../features/blogs/blogSlice";
import { getBCategories } from "../features/bCategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [images, setImages] = useState([]);
  const getBlogId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBCategories());
  }, [dispatch]);

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state)=>state.bCategory.bCategories);
  const blogState = useSelector((state)=>state.blog);
  const {isSuccess,isError,isLoading,createdBlog,blogName,blogDesc,blogCat,blogImg,updatedBlog} = blogState;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfullly!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlog,navigate,updatedBlog]);

  const img = useMemo(() => {
    return imgState.map((i) => ({
      public_id: i.public_id,
      url: i.url,
    }));
  }, [imgState]);
  // const img = [];
  // imgState.forEach((i) => {
  //   img.push({
  //     public_id: i.public_id,
  //     url: i.url,
  //   });
  // });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCat || "",
      images: blogImg || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  return (
    <div>
      <h3 className="mb-4 title">
      {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div className="">
        <form action=""  onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput type="text" label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title} />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select  name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category} className="form-control py-3 mb-3 mt-3" id="">
            <option value="">Select Blog Category</option>
            {bCatState.map((i,j)=>{
              return(
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              )
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
           <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {/* {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })} */}
            {blogState && blogState?.blogImg && blogState?.blogImg?.length > 0
              ? blogState?.blogImg?.map((image, index) => (
                  <div className="position-relative" key={index}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(image?.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={image?.url} alt="" width={200} height={200} />
                  </div>
                )) : (
              imgState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i?.url} alt="" width={200} height={200} />
                  </div>
                );
              })
            )}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;