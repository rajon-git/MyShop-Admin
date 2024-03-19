import React from "react";
import CustomInput from "../components/CustomInput";

function AddBrand() {
  return (
    <div>
      <h4 className="mb-4">Add Brand</h4>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Brand name" />
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
