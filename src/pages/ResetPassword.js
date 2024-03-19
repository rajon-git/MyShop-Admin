import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="py-5" style={{ background: "#001529", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please enter your reset password</p>
        <form action="">
          <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpass"
          />
          <Link
            className="border-0 px-3 py-2 text-white w-100 fw-bold text-center text-decoration-none"
            type="submit"
            style={{ background: "#001529" }}
          >
            Reset Password
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
