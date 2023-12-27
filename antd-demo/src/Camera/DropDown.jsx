import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { BASE_URL } from "../config/Config";

let items = [
  // {
  //   key: "1",
  //   label: "1",
  // },
  // {
  //   key: "2",
  //   label: "2",
  // },
  // {
  //   key: "3",
  //   label: " 3",
  // },
];
const DropDown = () => {
  const [size, setSize] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "api/Barnyards");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setSize(result.length);
        console.log(size);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    items = [];
    for (let i = 1; i <= size; i++) {
      items.push({
        key: i,
        label: i,
      });
    }
    // console.log(size);
  }, [size]);
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["1"],
      }}
    >
      <Typography.Link>
        <Space>
          Selectable
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
export default DropDown;
