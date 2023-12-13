import Navabr from "../Navabr/Navbar";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Avatar, Card, Space, Row, Col } from "antd";
import Title from "antd/es/typography/Title";
import NestedTable from "./NestedTable";

const today = new Date();
const formattedDate = today.toLocaleDateString();

const Dashboard = () => {
  return (
    <>
      <Navabr
        defaultSelectedKeys={"1"}
        content={
          <>
            <Row
              style={{
                backgroundColor: "white",
                width: "100%",
                marginBottom: "50px",
              }}
            >
              <Col
                style={{
                  marginLeft: "20px",
                }}
              >
                <Breadcrumb
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
                      title: "Dashboard",
                    },
                  ]}
                />
                <Space>
                  <Avatar size={50} icon={<UserOutlined />} />
                  <Title> Welcome Back!</Title>
                </Space>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ marginLeft: "25px", marginRight: "25px" }}
            >
              <Col span={8}>
                <Card
                  size="small"
                  title="Total Cows"
                  bordered={false}
                  style={{ textAlign: "center" }}
                >
                  <p>1000</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  size="small"
                  title="Total Barnyards"
                  bordered={false}
                  style={{ textAlign: "center" }}
                >
                  <p>10</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  size="small"
                  title="Date"
                  bordered={false}
                  style={{ textAlign: "center" }}
                >
                  <p>{formattedDate}</p>
                </Card>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ marginLeft: "25px", marginRight: "25px" }}
              align="center"
            >
              <Col
                style={{
                  marginLeft: "20px",
                  marginTop: "50px",
                }}
              >
                <h3 align="center">Latest Results</h3>
                <NestedTable />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default Dashboard;
