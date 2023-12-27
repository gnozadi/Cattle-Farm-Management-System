import React, { useState, useEffect } from "react";
import { Space, Table, Breadcrumb, Layout } from "antd";
import Navabr from "../Navabr/Navbar";
import { BASE_URL } from "../config/Config";
const Banyard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const response = await fetch(BASE_URL + "api/Barnyards");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const dataWithKeys = result.map((record, index) => ({
        ...record,
        key: index.toString(),
      }));
      setData(dataWithKeys);
      // setLoading(false);
    } catch (error) {
      console.log("error");
    }
    // setLoading(false);
  };

  const navigateToReportPage = (record) => {
    // Placeholder for navigation logic
    console.log("Navigate to report page with record:", record);
    // Implement your navigation logic here
  };

  const columns = [
    {
      title: "Banyard Name",
      dataIndex: "id",
      width: "25%",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Number of Camera",
      dataIndex: "number",
      width: "25%",
    },
    {
      title: "Last Review",
      dataIndex: "reportDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigateToReportPage(record)}>Detail</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navabr
        defaultSelectedKeys="3"
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
                  title: "Banyards",
                },
              ]}
            />
            <Layout style={{ margin: "50px" }}>
              <Table columns={columns} dataSource={data} />
            </Layout>
          </>
        }
      />
    </>
  );
};

export default Banyard;
