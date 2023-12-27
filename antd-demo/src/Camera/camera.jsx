import Navabr from "../Navabr/Navbar";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Form,
  Input,
  Layout,
  Popconfirm,
  Table,
  Typography,
  Button,
  message,
  Col,
  Drawer,
  Row,
  Space,
} from "antd";
import { BASE_URL, CAMERA_ENDPOINT_URL } from "../config/Config";
import { PlusOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Camera = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState();
  const [id, setID] = useState();

  const postData = async (type, userData) => {
    let payload = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(BASE_URL + type, payload);
      if (!response.ok) {
        message.error("Error Adding");
      } else {
        message.success("Added Successfully");
        return response;
      }
    } catch (error) {
      console.log("error");
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    const result = postData(CAMERA_ENDPOINT_URL, {
      link: link,
      barnyardId: id,
    });

    setOpen(false);
  };

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL + CAMERA_ENDPOINT_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();

      const dataWithKeys = result.map((record, index) => ({
        ...record,
        key: index.toString(),
      }));
      // console.log(result);
      setData(dataWithKeys);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData();
    };
  }, [open]);

  const putData = async (type, userData) => {
    console.log(type, userData);
    let payload = {
      method: "PUT",
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
        "Accept-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      // console.log("payload", payload);
      const response = await fetch(BASE_URL + type, payload);
      // console.log(response);
      return response;
    } catch (error) {
      console.log("error");
    }
  };

  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        const pl = { link: row.link, barnyardId: row.barnyardId, id: item.id };
        putData(CAMERA_ENDPOINT_URL + `/${item.id}`, pl).then((result) => {
          if (result.status >= 200 && result.status <= 300) {
            message.success("changed successfully!");
            setData(newData);
          } else {
            message.error(result.status);
          }
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Camera Link",
      dataIndex: "link",
      width: "25%",
      editable: true,
    },
    {
      title: "Banyard ID",
      dataIndex: "barnyardId",
      width: "15%",
      editable: true,
    },
    {
      title: "Installment Date",
      dataIndex: "installment_Date",
      width: "40%",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      width: "30%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Navabr
        defaultSelectedKeys="4"
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
                  title: "Cameras",
                },
              ]}
            />

            <Layout style={{ margin: "50px" }}>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                  loading={loading}
                />
              </Form>

              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
              >
                Add New
              </Button>
              <Drawer
                title="Add New Camera"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                  body: {
                    paddingBottom: 80,
                  },
                }}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} type="primary">
                      Submit
                    </Button>
                  </Space>
                }
              >
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="link"
                        label="Camera Link"
                        rules={[
                          {
                            required: true,
                            message: "Please enter camera link",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Link"
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="BarnyardID"
                        label="Barnyard ID"
                        rules={[
                          {
                            required: true,
                            message: "Please enter barnyard id",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: "100%",
                          }}
                          placeholder="barnyard ID"
                          onChange={(e) => setID(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Drawer>
            </Layout>
          </>
        }
      />
    </>
  );
};
export default Camera;
