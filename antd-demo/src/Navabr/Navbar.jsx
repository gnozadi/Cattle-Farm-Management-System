import React, { useState } from 'react';
import {
HomeOutlined,
  DesktopOutlined ,
  CameraOutlined ,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '1', <HomeOutlined />),
  getItem('Report', '2', <DesktopOutlined />),
  getItem('Cameras', 'sub1', <CameraOutlined />), 
  getItem('Account', 'sub2', <TeamOutlined/>), 
  getItem('Logout', '9', <LogoutOutlined />),
];
const Navabr = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      
    </Layout>
  );
};
export default Navabr;