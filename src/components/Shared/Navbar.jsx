import { useState } from "react";
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { logout, user } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  const menuItems = user
    ? [
        { key: "/", text: "Home", icon: <HomeOutlined /> },
        {
          key: "add-blog",
          text: "Add Blog",
          icon: <PlusOutlined />,
        },
        {
          key: "all-blogs",
          text: "All Blogs",
          icon: <UnorderedListOutlined />,
        },
        {
          key: "featured-blogs",
          text: "Featured Blogs",
          icon: <StarOutlined />,
        },
        { key: "wishlist", text: "Wishlist", icon: <HeartOutlined /> },
        {
          text: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]
    : [
        { key: "/", text: "Home", icon: <HomeOutlined /> },
        { key: "add-blog", text: "Add Blog", icon: <PlusOutlined /> },
        {
          key: "all-blogs",
          text: "All Blogs",
          icon: <UnorderedListOutlined />,
        },
        {
          key: "featured-blogs",
          text: "Featured Blogs",
          icon: <StarOutlined />,
        },
        { key: "wishlist", text: "Wishlist", icon: <HeartOutlined /> },
        {
          key: "login",
          text: "Login",
          icon: <UserOutlined />,
        },
        {
          key: "register",
          text: "Register",
          icon: <UserOutlined />,
        },
      ];

  const userMenu = (
    <Menu>
      {menuItems.map((item, idx) => (
        <Menu.Item key={idx} onClick={item.onClick}>
          <Link to={item.key || null}>
            {item.icon}
            {item.text}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="bg-blue-500">
      <div className="container mx-auto flex justify-between items-center lg:h-16 w-full max-w-[1400px]">
        <h3 className="text-white text-2xl font-bold">Blog Website</h3>
        <div className="lg:hidden">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          />
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button type="primary" className="flex items-center">
              <span className="mr-2">
                {user ? user.displayName || "Guest" : "Guest"}
              </span>
              {user ? (
                <Avatar src={user.photoURL} icon={<UserOutlined />} />
              ) : (
                <UserOutlined />
              )}
            </Button>
          </Dropdown>
        </div>
      </div>
      <div
        className={`${
          mobileMenuVisible ? "block" : "hidden"
        } lg:hidden w-full bg-blue-500  max-w-[1400px]`}
      >
        <Menu mode="vertical" theme="dark" style={{ border: "none" }}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} onClick={item.onClick}>
              {item.icon}
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
