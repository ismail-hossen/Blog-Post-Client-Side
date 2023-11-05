import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import { LockOutlined, GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const { login, googleLogin } = useContext(ThemeContext);

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

  const onFinish = (values) => {
    const { email, password } = values;
    login(email, password)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <Row className="h-screen justify-center items-center">
      <Col span={24} sm={16} md={12} lg={8}>
        <Card className="w-full p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Log In</h2>
          <Divider />
          <Form name="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-primary" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-primary" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="w-full bg-primary hover:bg-primary-dark"
              >
                Log In
              </Button>
              <p className="text-red-500">{error}</p>
            </Form.Item>
          </Form>
          <Divider>Or</Divider>
          <Button
            onClick={handleLoginWithGoogle}
            className="w-full flex items-center justify-center bg-white border border-gray-300 hover:border-primary"
          >
            <GoogleOutlined />
            <span>Log in with Google</span>
          </Button>
          <div className="text-center mt-4">
            <p>Don&apos;t have an account?</p>
            <Link to="/register">
              <Button type="link">Register</Button>
            </Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/">
              <Button type="link">Continue as guest</Button>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
