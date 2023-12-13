import React, { useState } from "react";
import {
  HomeOutlined,
  DesktopOutlined,
  CameraOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};
const Navabr = ({ defaultSelectedKeys, content }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKeys]}
          mode="inline"
        >
          {/* 1 */}
          <Menu.Item key={"1"} label={"Dashboard"} icon={<HomeOutlined />}>
            <Link to="../dashboard" className="link" style={linkStyle}>
              Dashboard
            </Link>
          </Menu.Item>
          {/* 2 */}
          <Menu.Item key={"2"} label={"Reports"} icon={<SettingOutlined />}>
            <Link to="../config" className="link" style={linkStyle}>
              Config
            </Link>
          </Menu.Item>
          {/* 3 */}
          <Menu.Item key={"3"} label={"Reports"} icon={<DesktopOutlined />}>
            <Link to="../barnyards" className="link" style={linkStyle}>
              Barnyards
            </Link>
          </Menu.Item>
          {/* 4 */}
          <Menu.Item key={"4"} label={"Cameras"} icon={<CameraOutlined />}>
            <Link to="../cameras" className="link" style={linkStyle}>
              Cameras
            </Link>
          </Menu.Item>
          {/* 5 */}
          <Menu.Item key={"5"} label={"Account"} icon={<TeamOutlined />}>
            <Link to="../account" className="link" style={linkStyle}>
              Account
            </Link>
          </Menu.Item>
          {/* 6 */}
          <Menu.Item key={"6"} label={"Logout"} icon={<LogoutOutlined />}>
            <Link to="../" className="link" style={linkStyle}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content> {content}</Content>
    </Layout>
  );
};
export default Navabr;
