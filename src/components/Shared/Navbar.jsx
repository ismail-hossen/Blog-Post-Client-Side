import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  Dropdown,
  Avatar,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  GoogleOutlined,
  HomeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  HeartOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../authContext/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const { createUser, login, logout, user, googleLogin } =
    useContext(ThemeContext);

  const handleLogin = () => {
    login(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleLoginWithGoogle = () => {
    googleLogin()
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleRegister = () => {
    createUser(email, password)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

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
          onClick: logout,
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
              <span className="mr-2">
                {user ? user.username || "Guest" : "Guest"}
              </span>
              {user ? <Avatar icon={<UserOutlined />} /> : <UserOutlined />}
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
        footer={null}
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
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              block
              onClick={handleLogin}
            >
              Login
            </Button>
            <p className="text-red-500">{error}</p>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              icon={<GoogleOutlined />}
              onClick={handleLoginWithGoogle}
              block
            >
              Login with Google
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Register"
        visible={isRegisterVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={null}
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
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              block
              onClick={handleRegister}
            >
              Register
            </Button>
            <p className="text-red-500">{error}</p>
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export default Navbar;
