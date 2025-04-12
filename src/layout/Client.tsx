import { Layout, Menu, Avatar, Dropdown } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const ClientLayout = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  const userMenu = {
    items: [
      {
        key: "1",
        label: <Link to="/profile">Chỉnh sửa thông tin</Link>,
      },
      {
        key: "2",
        label: <Link to="/cart">Giỏ hàng</Link>,
      },
      {
        key: "3",
        label: <div onClick={handleLogout}>Đăng xuất</div>,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>

            {!user && (
              <>
                <Menu.Item key="2">
                  <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </>
            )}

            {user?.role === "admin" && (
              <Menu.Item key="4">
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            )}

            {user && (
              <Menu.Item key="user" style={{ marginLeft: "auto" }}>
                <Dropdown menu={userMenu} placement="bottomRight">
                  <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ color: "#fff" }}>{user.email}</span>
                  </div>
                </Dropdown>
              </Menu.Item>
            )}
          </Menu>
        </Header>

        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
