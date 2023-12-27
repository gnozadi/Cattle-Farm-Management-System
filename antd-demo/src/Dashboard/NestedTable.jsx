import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { BASE_URL } from "../config/Config";

function NestedTable() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch(BASE_URL + "api/Barnyards");
        const response = await fetch(BASE_URL + "api/Barnyards/dashboard2");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const dataWithKeys = result.map((record, index) => ({
          ...record,
          key: index.toString(),
        }));
        setData(dataWithKeys);
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const expandedRowRender = (record) => {
    const columns = [
      { title: "Cow Comfort Index (CCI)", dataIndex: "cci", key: "cci" },
      { title: "Stall Use Index (SUI)", dataIndex: "sui", key: "sui" },
      {
        title: "Stall Standing Index (SSI)",
        dataIndex: "ssi",
        key: "ssi",
      },
    ];

    const nestedData = [
      { key: record.id, cci: record.cci, sui: record.sui, ssi: record.ssi },
    ];
    return (
      <Table columns={columns} dataSource={nestedData} pagination={false} />
    );
  };

  const columns = [
    {
      title: "Barnyard #",

      dataIndex: "number",
      key: "id",
    },
    { title: "Number of Cows", dataIndex: "total_Cow_count", key: "cows" },
    {
      title: "Last Report Date",
      // dataIndex: "reportDate",
      dataIndex: "lastReport",
      key: "lastReport",
    },
  ];

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data}
      scroll={{ y: true }}
      loading={loading}
    />
  );
}

export default NestedTable;
