import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { FaRegEye } from "react-icons/fa6";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Enquires() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
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
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquires/${enquiryState[i]._id}`}
          >
            <FaRegEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 500);
  };
  return (
    <div>
      <h3 className="mb-4">Enquires</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure, want to delete this enquiry?"
      />
    </div>
  );
}

export default Enquires;
