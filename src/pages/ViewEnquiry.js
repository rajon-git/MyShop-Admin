import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { IoMdArrowBack } from "react-icons/io";

function ViewEnquiry() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryMobile,
    enquiryEmail,
    enquiryComment,
    enquiryStatus,
  } = enqState;
  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId]);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 300);
  };
  return (
    <div className="container" style={{ overflowX: "auto" }}>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-4">View Enquiry</h3>
            <button
              className="bg-transparent border-0 fs-5 mb-0 d-flex align-items-center gap-1"
              onClick={goBack}
            >
              <IoMdArrowBack className="fs-5" /> Go Back
            </button>
          </div>
          <div className="mt-5 bg-white p-4 rounded-3">
            <div className="mb-3">
              <h5>Name:</h5>
              <p>{enquiryName}</p>
            </div>
            <div className="mb-3">
              <h5>Mobile:</h5>
              <a href={`tel:+88${enquiryMobile}`}>{enquiryMobile}</a>
            </div>
            <div className="mb-3">
              <h5>Email:</h5>
              <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
            </div>
            <div className="mb-3">
              <h5>Comment:</h5>
              <p>{enquiryComment}</p>
            </div>
            <div className="mb-3">
              <h5>Status:</h5>
              <p>{enquiryStatus}</p>
            </div>
            <div className="mb-3">
              <h5>Change Status:</h5>
              <select
                defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
                className="form-control"
                onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEnquiry;
