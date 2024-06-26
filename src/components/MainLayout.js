import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartArrowDown, FaClipboardList, FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { RiCoupon5Line } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoMdColorFill } from "react-icons/io";
import { AiOutlinePicLeft, AiOutlinePicRight } from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const userState = useSelector((state)=>state?.auth?.user);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.stopPropagation();
    localStorage.clear();
    navigate("/");
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 p-3 text-center mb-0">
            <span className="sm-logo">MS</span>
            <span className="lg-logo">My Shop</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdSpaceDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaUsers className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <FaCartArrowDown className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <FaCartArrowDown className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaCartArrowDown className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <MdOutlineCategory className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <MdOutlineCategory className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <IoMdColorFill className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <IoMdColorFill className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "order",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <FaBloggerB className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon5Line className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquires",
              icon: <FaBloggerB className="fs-4" />,
              label: "Enquires",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-5 "
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            className="button"
            type="text"
            icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <IoNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute ">
                3
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg"
                  alt=""
                />
              </div>
              <div
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{userState && userState?.firstName}</h5>
                <p className="mb-0">{userState && userState?.email}</p>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to={userState !== null && "/profile"}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={(e) => handleSignout(e)}
                  >
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <main>
            <ToastContainer
              position="top-right"
              autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

// import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MdSpaceDashboard } from "react-icons/md";
// import { FaCartArrowDown, FaClipboardList, FaBloggerB } from "react-icons/fa";
// import { ImBlog } from "react-icons/im";
// import { FaUsers } from "react-icons/fa6";
// import { RiCoupon5Line } from "react-icons/ri";
// import { SiBrandfolder } from "react-icons/si";
// import { MdOutlineCategory } from "react-icons/md";
// import { IoNotifications } from "react-icons/io5";
// import { IoMdColorFill } from "react-icons/io";
// import { AiOutlinePicLeft, AiOutlinePicRight } from "react-icons/ai";
// import { Layout, Menu, Button, theme } from "antd";
// import { Link, Outlet, useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const MainLayout = () => {
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const navigate = useNavigate();

//   const handleSignout = (e) => {
//     e.stopPropagation();
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="container-fluid">
//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasExample"
//         aria-labelledby="offcanvasExampleLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="offcanvasExampleLabel">
//             Dev Corners
//           </h5>
//           <button
//             type="button"
//             className="btn-close text-reset"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//             onClick={() => setShowOffcanvas(false)}
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={[""]}
//             onClick={({ key }) => {
//               if (key === "signout") {
//                 handleSignout();
//               } else {
//                 navigate(key);
//               }
//             }}
//             items={[
//               {
//                 key: "",
//                 icon: <MdSpaceDashboard className="fs-4" />,
//                 label: "Dashboard",
//               },
//               {
//                 key: "customers",
//                 icon: <FaUsers className="fs-4" />,
//                 label: "Customers",
//               },
//               {
//                 key: "catalog",
//                 icon: <FaCartArrowDown className="fs-4" />,
//                 label: "Catalog",
//                 children: [
//                   {
//                     key: "product",
//                     icon: <FaCartArrowDown className="fs-4" />,
//                     label: "Add Product",
//                   },
//                   {
//                     key: "product-list",
//                     icon: <FaCartArrowDown className="fs-4" />,
//                     label: "Product List",
//                   },
//                   {
//                     key: "brand",
//                     icon: <SiBrandfolder className="fs-4" />,
//                     label: "Add Brand",
//                   },
//                   {
//                     key: "brand-list",
//                     icon: <SiBrandfolder className="fs-4" />,
//                     label: "Brand List",
//                   },
//                   {
//                     key: "category",
//                     icon: <MdOutlineCategory className="fs-4" />,
//                     label: "Add Category",
//                   },
//                   {
//                     key: "category-list",
//                     icon: <MdOutlineCategory className="fs-4" />,
//                     label: "Category List",
//                   },
//                   {
//                     key: "color",
//                     icon: <IoMdColorFill className="fs-4" />,
//                     label: "Color",
//                   },
//                   {
//                     key: "color-list",
//                     icon: <IoMdColorFill className="fs-4" />,
//                     label: "Color List",
//                   },
//                 ],
//               },
//               {
//                 key: "order",
//                 icon: <FaClipboardList className="fs-4" />,
//                 label: "Orders",
//               },
//               {
//                 key: "marketing",
//                 icon: <FaBloggerB className="fs-4" />,
//                 label: "Marketing",
//                 children: [
//                   {
//                     key: "coupon",
//                     icon: <ImBlog className="fs-4" />,
//                     label: "Add Coupon",
//                   },
//                   {
//                     key: "coupon-list",
//                     icon: <RiCoupon5Line className="fs-4" />,
//                     label: "Coupon List",
//                   },
//                 ],
//               },
//               {
//                 key: "blogs",
//                 icon: <FaBloggerB className="fs-4" />,
//                 label: "Blogs",
//                 children: [
//                   {
//                     key: "blog",
//                     icon: <ImBlog className="fs-4" />,
//                     label: "Add Blog",
//                   },
//                   {
//                     key: "blog-list",
//                     icon: <FaBloggerB className="fs-4" />,
//                     label: "Blog List",
//                   },
//                   {
//                     key: "blog-category",
//                     icon: <ImBlog className="fs-4" />,
//                     label: "Add Blog Category",
//                   },
//                   {
//                     key: "blog-category-list",
//                     icon: <FaBloggerB className="fs-4" />,
//                     label: "Blog Category List",
//                   },
//                 ],
//               },
//               {
//                 key: "enquires",
//                 icon: <FaBloggerB className="fs-4" />,
//                 label: "Enquires",
//               },
//             ]}
//           />
//         </div>
//       </div>

//       <Layout>
//         <Header
//           className="d-flex justify-content-between ps-3 pe-5"
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Button
//             className="button"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasExample"
//             aria-controls="offcanvasExample"
//             onClick={() => setShowOffcanvas(!showOffcanvas)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           >
//             {showOffcanvas ? <AiOutlinePicLeft /> : <AiOutlinePicRight />}
//           </Button>

//           <div className="d-flex align-items-center gap-4">
//             <div className="position-relative">
//               <IoNotifications className="fs-4" />
//               <span className="badge bg-warning rounded-circle p-1 position-absolute">
//                 3
//               </span>
//             </div>
//             <div className="d-flex align-items-center gap-3">
//               <div>
//                 <img
//                   width={32}
//                   height={32}
//                   src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <h5 className="mb-0">Rajon</h5>
//                 <p className="mb-0">rajon.zhsust15@gmail.com</p>
//               </div>
//               <div className="dropdown-menu">
//                 <li>
//                   <Link
//                     className="dropdown-item py-1 mb-1"
//                     style={{ height: "auto", lineHeight: "20px" }}
//                     to="/"
//                   >
//                     View Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     className="dropdown-item py-1 mb-1"
//                     style={{ height: "auto", lineHeight: "20px" }}
//                     onClick={handleSignout}
//                   >
//                     Signout
//                   </button>
//                 </li>
//               </div>
//             </div>
//           </div>
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <main>
//             <ToastContainer
//               position="top-right"
//               autoClose={250}
//               hideProgressBar={false}
//               newestOnTop={true}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               theme="light"
//             />
//             <Outlet />
//           </main>
//         </Content>
//       </Layout>
//     </div>
//   );
// };

// export default MainLayout;
