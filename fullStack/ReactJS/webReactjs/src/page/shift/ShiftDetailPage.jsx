import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Button, Space, Spin, Table } from "antd";
import { formatDateClient } from "../../share/Helper";

const ShiftDetailPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const res = await request("shiftDetail", "get");
    setLoading(false);
    if (res) {
      setList(res.lists);
    }
  };

  const onOpenModel = () => {

  }

  return (
    <div>
      <Spin spinning={loading}>
        <div className=" flex justify-between mb-3 ">
          <h1 className=" font-bold text-2xl">Shift Details Page</h1>
          {/* <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />*/}
          <Button className=" bg-blue-700 text-white" onClick={onOpenModel}>
            New shift_detail
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={[
            {
              key: "No",
              title: "No",
              render: (value, item, index) => index +1
            },
            {
              key: "Shift_Id",
              title: "Shift_Id",
              dataIndex:"shiftId"
            },
            {
              key: "Employee_Id",
              title: "Employee_Id",
              dataIndex:"employeeId"
            },
            {
              key: "Openning Balance",
              title: "Openning Balace",
              dataIndex:"openningBalance"
            },
            {
              key: "Is Close",
              title: "Is Close",
              dataIndex:"isClose"
            },
            {
              key: "Create_At",
              title: "Create_At",
              render: (value) => formatDateClient(value)
            },
            {
              key: "Action",
              title: "Action",
              render: (value, item, index) => {
                return <Space>
                  <Button type="primary" ghost>Edit</Button>
                  <Button danger>Delete</Button>
                </Space>
              }
            },
          ]}  
        >

        </Table>
      </Spin>
    </div>
  );
};

export default ShiftDetailPage;
