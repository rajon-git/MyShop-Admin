import React, { useState } from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartArrowDown, FaClipboardList, FaBloggerB  } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdColorFill } from "react-icons/io";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key == 'signout')
            {}
            else
            {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <MdSpaceDashboard className='fs-4'/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FaUsers className='fs-4'/>,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <FaCartArrowDown className='fs-4'/>,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <FaCartArrowDown className='fs-4'/>,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <FaCartArrowDown className='fs-4'/>,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <MdOutlineCategory className='fs-4'/>,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <MdOutlineCategory className='fs-4'/>,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <IoMdColorFill className='fs-4'/>,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <IoMdColorFill className='fs-4'/>,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'order',
              icon: <FaClipboardList className='fs-4'/>,
              label: 'Orders',
            },
            {
              key: 'blog',
              icon: <FaBloggerB  className='fs-4'/>,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog  className='fs-4'/>,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB  className='fs-4'/>,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog  className='fs-4'/>,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB  className='fs-4'/>,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquires',
              icon: <FaBloggerB  className='fs-4'/>,
              label: 'Enquires',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;