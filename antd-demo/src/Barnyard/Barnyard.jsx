import React, { useState, useEffect } from 'react';
import { Space, Table , Breadcrumb, Layout} from 'antd';
import Navabr from '../Navabr/Navbar';

const Banyard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'your_api_url' with the actual URL from your backend
      const response = await fetch('data.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToReportPage = (record) => {
    // Placeholder for navigation logic
    console.log('Navigate to report page with record:', record);
    // Implement your navigation logic here
  };

  const columns = [
    {
      title: 'Banyard Name',
      dataIndex: 'banyard_name',
      width: "25%",
      
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Number of Camera',
      dataIndex: 'camera',
      width: "25%",
      
      
    },
    {
      title: 'Last Review',
      dataIndex: 'last_review',
      
    },
    {
      title: 'Action',
      key: 'action',
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
