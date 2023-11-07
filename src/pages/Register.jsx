import { useContext } from "react";
import { ThemeContext } from "../authContext/AuthContext";
import { useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import { LockOutlined, GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState(null);
  const { createUser, googleLogin } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginWithGoogle = () => {
    googleLogin()
      .then(() => {
        setError(null);
        toast.success("Successfully logged in!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const onFinish = (values) => {
    const { email, password } = values;
    createUser(email, password)
      .then(() => {
        setError(null);
        toast.success("Created account successfully!");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
  const validatePassword = (rule, value) => {
    if (value && !passwordPattern.test(value)) {
      return Promise.reject(
        "Password must have at least one uppercase letter, one special character, one numeric character, and be at least 6 characters long."
      );
    }
    return Promise.resolve();
  };

  return (
    <Row className="h-screen justify-center items-center">
      <Col span={24} sm={16} md={12} lg={8}>
        <Card className="w-full p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Create an account</h2>
          <Divider />
          <Form name="register-form" onFinish={onFinish}>
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
                  validator: validatePassword,
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
                Register
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
            <p>Already have an account?</p>
            <Link to="/login">
              <Button type="link">Login</Button>
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

export default Register;
