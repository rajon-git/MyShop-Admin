import React from "react";
import CustomInput from "../components/CustomInput";

function AddBlogCat() {
  return (
    <div>
      <h4 className="mb-4">Add Blog Category</h4>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter blog category" />
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
