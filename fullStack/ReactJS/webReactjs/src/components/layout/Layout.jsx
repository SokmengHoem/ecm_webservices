import { Outlet, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, Badge, Avatar } from "antd";
import { Config, getCurrentUser, isLogin } from "../../share/Helper";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const user = getCurrentUser();
  if (!isLogin()) {
    return null;
  }
  useEffect(() => {
    if (!isLogin()) {
      window.location.href = "/login";
    }
  });

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const onLinkPage = (routeName) => {
    navigate(routeName);
  };

  const onLogout = () => {
    localStorage.setItem("isLogin", null);
    window.location.href = "/login";
  };

  if (isLogin == null || isLogin == "null") {
    return null;
  }
  // var profile = JSON.parse(localStorage.getItem("profile"))
  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dashboard",
                onClick: () => onLinkPage("/"),
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Category",
                onClick: () => onLinkPage("/category"),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Product",
                onClick: () => onLinkPage("/product"),
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Customer",
                onClick: () => onLinkPage("/customer"),
              },
              {
                key: "5",
                icon: <UploadOutlined />,
                label: "Employee",
                onClick: () => onLinkPage("/employee"),
              },
              {
                key: "6",
                icon: <UploadOutlined />,
                label: "Payment method",
                onClick: () => onLinkPage("/payment_method"),
              },
              {
                key: "7",
                icon: <UploadOutlined />,
                label: "Invoice Status",
                onClick: () => onLinkPage("/invoice_status"),
              },
              {
                key: "8",
                icon: <UploadOutlined />,
                label: "Role",
                onClick: () => onLinkPage("/role"),
              },
              {
                key: "9",
                icon: <UploadOutlined />,
                label: "Shift",
                onClick: () => onLinkPage("/shift"),
              },
              {
                key: "10",
                icon: <UploadOutlined />,
                label: "Shift Details",
                onClick: () => onLinkPage("/shiftDetail"),
              },
              {
                key: "11",
                icon: <UploadOutlined />,
                label: "POS",
                onClick: () => onLinkPage("/pos"),
              },
              {
                key: "12",
                icon: <UploadOutlined />,
                label: "Order",
                onClick: () => onLinkPage("/order"),
              },
              {
                key: "13",
                icon: <UploadOutlined />,
                label: "Product Alert", 
                onClick: () => onLinkPage("/product-alert"),
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
            <div className=" flex justify-between px-3">
              <div>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
              <div>
                <Space>
                  <div className=" pr-3">
                  <Badge count={5} size="sm">
                    <Avatar shape="square" size="large" />
                  </Badge>
                  </div>
              
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "0",
                        label: "profile",
                      },
                      {
                        key: "1",
                        label: "Change password",
                      },
                      {
                        key: "2",
                        label: "Logout",
                        danger: true,
                        onClick: () => onLogout()
                      },
                    ],
                  }}
                >
                 
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {/* <UserOutlined/> */}
                       {(user.image == "" || user.image == null) ?
                        <div style={{ width:40, height:40,borderRadius:20,borderBlockColor:"red" }}>

                        </div>
                        :
                        <div>
                          <img src={Config.image_path + user.image} alt=""  style={{ width:40, height:40, borderRadius:20 }}/>
                        </div>

                       }
                       {user.firstname+"-"+user.lastname }
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                </Space>
              </div>
            </div>
            {/* 
           // <Button onClick={onLogout}>Logout</Button> */}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className=" p-6">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
