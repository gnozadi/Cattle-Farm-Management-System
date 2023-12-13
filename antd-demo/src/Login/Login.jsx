import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Flex, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FaCow } from "react-icons/fa6";
import SessionManager from "../Auth/SessionManager";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postData = async (type, userData) => {
    let BaseURL = "https://localhost:5131/";
    let payload = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(BaseURL + type, payload);
      const result_1 = await response.json();
      return result_1;
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    let userInfo = { values };

    postData("api/Auth/Login", userInfo).then((result) => {
      if (result?.token) {
        SessionManager.setUserSession(
          result.userName,
          result.token,
          result.userId,
          result.usersRole
        );

        if (SessionManager.getToken()) {
          setLoading(false);
          navigate("/dashboard");
        }
      } else {
        console.log("error");
        let errors = "";
        for (const key in result?.errors) {
          if (Object.hasOwnProperty.call(result.errors, key)) {
            errors += result.errors[key];
          }
        }
        errors = errors === "" ? "Login is unsuccessfull!" : errors;
        message.error(errors);
        setLoading(false);
      }
    });

    // if (values.username === "demo" && values.password === "password") {
    //   message.success("Login successful!");
    //   navigate("/dashboard");
    // } else {
    // }

    setLoading(false);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Flex justify="center" align="center">
            {/* <img src="src\assets\react.svg" width={25} height={25} alt="logo" /> */}
            <FaCow size="40" />
            <h1 style={{ textAlign: "center" }}>Cattleision</h1>
          </Flex>

          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
