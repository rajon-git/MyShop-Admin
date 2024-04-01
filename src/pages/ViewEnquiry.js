import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAEnquiry } from '../features/enquiry/enquirySlice';
import { IoMdArrowBack } from "react-icons/io";

function ViewEnquiry() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getEnqId = location.pathname.split("/")[3];
    const enqState = useSelector((state)=>state.enquiry);
    const {enquiryName,enquiryMobile,enquiryEmail,enquiryComment,enquiryStatus} = enqState;
    useEffect(()=>{
        dispatch(getAEnquiry(getEnqId));
    },[getEnqId]);
    const goBack = ()=>{
        navigate(-1);
    }
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
      <h3 className="mb-4">View Enquiry</h3>
      <button className='bg-transparent border-0 fs-5 mb-0 d-flex align-items-center gap-1' onClick={goBack}><IoMdArrowBack className='fs-5'/> Go Back</button>
      </div>
      <div className='mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Name: </h5>
            <p className='mb-0'>{enquiryName}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Mobile: </h5>
            <a href='tel:+88{enquiryMobile}'>{enquiryMobile}</a>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Email: </h5>
            <a href='mailto:{enquiryEmail}'>{enquiryEmail}</a>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Comment: </h5>
            <p className='mb-0'>{enquiryComment}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Status: </h5>
            <p className='mb-0'>{enquiryStatus}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
            <h5 className='mb-0'>Change Status: </h5>
            <div>
                <select name="" defaultValue={enquiryStatus ? enquiryStatus: "Submitted"} className='form-control form-select' id="">
                <option value="Submitted" selected>
                Submitted
                    </option>
                    <option value="Contacted" selected>
                        Contacted
                    </option>
                    <option value="In Progress" selected>
                        In Progress
                    </option>
                    <option value="Resolved" selected>
                        Resolved
                    </option>
                </select>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEnquiry
