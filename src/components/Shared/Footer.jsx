import { Layout, Row, Col, Typography, Button, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const BlogFooter = () => {
  return (
    <Footer className="bg-gray-800 text-white p-6">
      <div className="w-full max-w-[1400px] mx-auto">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">About Us</h3>
              <p>
                We are a blog website dedicated to sharing knowledge and
                insights. Explore the world with us.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <Space size={8}>
                <Button type="link" icon={<FacebookOutlined />} />
                <Button type="link" icon={<TwitterOutlined />} />
                <Button type="link" icon={<InstagramOutlined />} />
                <Button type="link" icon={<LinkedinOutlined />} />
              </Space>
              <p>
                Stay connected with us on social media for the latest updates.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Contact</h3>
              <p>
                Email: info@blogwebsite.com
                <br />
                Phone: +1 (123) 456-7890
              </p>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-6">
          <Text className="text-white">
            © 2023 Blog Website. All Rights Reserved.
          </Text>
        </div>
      </div>
    </Footer>
  );
};

export default BlogFooter;
