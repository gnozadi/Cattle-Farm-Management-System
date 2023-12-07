import React from "react";
import { Row, Button, Form, Input, Layout, Col } from "antd";

const styles = {
  container: {
    backgroundColor: "#e2e2e2",
  },
  rowContainer: {
    marginTop: "100px",
  },
  formContainer: {
    marginTop: "50  px",
    maxWidth: 600,
  },
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => (
  <div className="container" style={styles.container}>
    <Row justify="space-around" align="middle" style={styles.rowContainer}>
      <h1>
        {""}
        <img src="src/assets/react.svg" alt="Logo" />
        Cattleision
      </h1>
    </Row>
    <Row gutter={16} justify="space-around" align="middle">
      <Col span={6} style={styles.formContainer}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div></div>
      </Col>
    </Row>
  </div>
);

export default Login;
