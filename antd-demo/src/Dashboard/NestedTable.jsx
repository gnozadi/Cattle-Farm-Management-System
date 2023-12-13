import React from "react";
import { Table, Badge, Menu, Dropdown } from "antd";

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: "Cow Comfort Index (CCI)", dataIndex: "cci", key: "cci" },
      { title: "Stall Use Index (SUI)", dataIndex: "sui", key: "sui" },
      {
        title: "Stall Standing Index (SSI)",
        dataIndex: "ssi",
        key: "ssi",
      },
    ];

    const data = [{ key: 0, cci: "10%", sui: "10%", ssi: "10%" }];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Barnyard #", dataIndex: "id", key: "id" },
    { title: "Number of Cows", dataIndex: "cows", key: "cows" },
    { title: "Last Report Date", dataIndex: "lastReport", key: "lastReport" },
  ];

  const data = [];
  for (let i = 0; i < 5; ++i) {
    data.push({
      key: i,
      id: `${i + 1}`,
      cows: `${i + 1}` * 100,
      lastReport: "12/10/2023",
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ["0"],
      }}
      dataSource={data}
      scroll={{ y: true }}
    />
  );
}

export default NestedTable;
