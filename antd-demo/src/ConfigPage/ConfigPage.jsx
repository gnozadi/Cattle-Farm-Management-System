import Navabr from "../Navabr/Navbar";
import { BASE_URL } from "../config/Config";
import React, { useState } from "react";
import {
  Alert,
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

const originData = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    id: `${i}`,
    cows: 100,
    milking: `${i}:00`,
  });
}

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
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

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

  const putData = async (type, userData) => {
    let payload = {
      method: "PUT",
      headers: {
        // "access-control-allow-origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(BASE_URL + type, payload);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      console.log("before: ", row);

      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        console.log("new: ", newData, "Key: ", index);

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        let d = {
          number: 0,
          milkingTime: {
            hour: 0,
            minute: 0,
          },
          total_Cow_count: 0,
          id: 0,
        };

        putData(`api/Barnyards/${index}`, d).then((result) => {
          if (result.status == 200) {
            setData(newData);
          } else {
            message.error(result.title);
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
      title: "Barnyard #",
      dataIndex: "id",
      width: "25%",
      editable: false,
    },
    {
      title: "Number of Cows",
      dataIndex: "cows",
      width: "15%",
      editable: true,
    },
    {
      title: "Milking Time",
      dataIndex: "milking",
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
        inputType: col.dataIndex === "cows" ? "number" : "text",
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
