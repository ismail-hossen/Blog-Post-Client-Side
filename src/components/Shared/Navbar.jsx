import { useState } from "react";
import { Layout, Menu, Button, Modal, Form, Input, Dropdown } from "antd";
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

const { Header } = Layout;

const Navbar = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const user = false;
  console.log(email, password);

  const handleLogin = () => {};

  const handleRegister = () => {};

  const handleLogout = () => {};

  const menuItems = user
    ? [
        { key: "home", text: "Home", icon: <HomeOutlined /> },
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
          key: "logout",
          text: "Logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]
    : [
        { key: "home", text: "Home", icon: <HomeOutlined /> },
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
          onClick: () => setLoginVisible(true),
        },
        {
          key: "register",
          text: "Register",
          icon: <UserOutlined />,
          onClick: () => setRegisterVisible(true),
        },
      ];

  const userMenu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} onClick={item.onClick}>
          {item.icon}
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="bg-blue-500">
      <div className="container mx-auto flex justify-between items-center lg:h-16">
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
              {user ? user.username : "Guest"} {user ? "" : <UserOutlined />}
            </Button>
          </Dropdown>
        </div>
      </div>
      <div
        className={`${
          mobileMenuVisible ? "block" : "hidden"
        } lg:hidden w-full bg-blue-500`}
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
      <Modal
        title="Login"
        visible={isLoginVisible}
        onCancel={() => setLoginVisible(false)}
        footer={[
          <Button key="back" onClick={() => setLoginVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleLogin}>
            Login
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onValuesChange={(values) => {
            if (values?.email) {
              setEmail(values.email);
            }
            if (values?.password) {
              setPassword(values.password);
            }
          }}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Register"
        visible={isRegisterVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={[
          <Button key="back" onClick={() => setRegisterVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleRegister}>
            Register
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onValuesChange={(values) => {
            if (values?.email) {
              setEmail(values.email);
            }
            if (values?.password) {
              setPassword(values.password);
            }
          }}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export default Navbar;
