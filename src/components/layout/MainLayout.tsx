import { Button, Layout, theme } from "antd";
import {  Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { PoweroffOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const { Header, Content } = Layout;


const MainLayout = () => {

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());    
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = useAppSelector(state => state.auth.user)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%' }}>
        <Title style={{marginLeft: 20, marginRight: 'auto'}} level={4}>Hello, {user?.name}!</Title>
          <Button onClick={handleLogout} type="default" style={{marginRight: 20}} icon={<PoweroffOutlined />}>Logout</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
