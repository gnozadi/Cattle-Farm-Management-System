import Navabr from "../Navabr/Navbar";
import { BARNYARDS_ENDPOINT_URL, BASE_URL } from "../config/Config";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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
const ConfigPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    // console.log(record);
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL + BARNYARDS_ENDPOINT_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const dataWithKeys = result.map((record, index) => ({
          ...record,
          key: index.toString(),
        }));
        // console.log(dataWithKeys);
        setData(dataWithKeys);
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const putData = async (type, userData) => {
    // console.log(type, userData);
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
    // console.log("key", key);
    try {
      const row = await form.validateFields();
      const newData = [...data];

      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        let d = {
          number: Number(item.id),
          milkingTime: row.milkingTime,
          total_Cow_count: row.total_Cow_count,
          id: item.id,
        };

        console.log(d);

        putData(BARNYARDS_ENDPOINT_URL + `/${item.id}`, d).then((result) => {
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
      // id
      title: "Barnyard #",
      dataIndex: "number",
      width: "25%",
      editable: false,
    },
    {
      //total_Cow_count
      title: "Number of Cows",
      dataIndex: "total_Cow_count",
      width: "15%",
      editable: true,
    },
    {
      // milkingTime
      title: "Milking Time",
      dataIndex: "milkingTime",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
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
        inputType: "text",
        // col.dataIndex === "milkingTime" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Navabr
        defaultSelectedKeys="2"
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
                  title: "Config",
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
                  loading={loading}
                />
              </Form>
            </Layout>
          </>
        }
      />
    </>
  );
};
export default ConfigPage;
