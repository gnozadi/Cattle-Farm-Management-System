import Navabr from "../Navabr/Navbar";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    if (values.currentPassword === "password") {
      message.success("Password Changed successfully!");
      navigate("/dashboard");
    } else {
      message.error("Current Password is Incorrect!");
    }
    setLoading(false);
  };
  return (
    <Navabr
      defaultSelectedKeys="5"
      content={
        <>
          <Breadcrumb
            style={{ marginLeft: "20px" }}
            separator=""
            items={[
              {
                href: "",
                title: "Home",
              },
              {
                type: "separator",
              },
              {
                title: "Account",
              },
            ]}
          />
          <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Col
              xs={24}
              sm={16}
              md={12}
              lg={8}
              style={{
                backgroundColor: "white",
                padding: "60px",
                borderRadius: "10px",
              }}
            >
              <Space align="center" justify="center">
                <Avatar size={64} icon={<UserOutlined />} />
                <h1>Change Password</h1>
              </Space>
              <Divider />
              {/* Form */}
              <Form
                name="change-password-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Current Password" />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: "Please enter a new password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                  ]}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ width: "100%" }}
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default Account;
