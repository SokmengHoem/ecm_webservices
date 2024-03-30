import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Spin, Table, Button, Space } from "antd";
import { formatDateClient } from "../../share/Helper";

const InvoiceStatus = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setLoading(!loading);
    const res = await request("orderStatus", "get");
    setLoading(loading);
    if (res) {
      setList(res.lists);
    }
  };
  return (
    <div>
      <Spin spinning={loading}>
        <div className=" flex justify-between mb-3">
          <h1 className=" font-bold text-2xl">Invoice-status Page</h1>
          {/* <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />*/}
          <Button className=" bg-blue-700 text-white">New invoice</Button>
        </div>
        <Table
          dataSource={list}
          columns={[
            {
              key: "id",
              title: "No",
              render: (value, items, index) => index + 1,
            },
            {
              key: "Name",
              title: "Name",
              dataIndex: "name",
            },
            
            {
              key: "Message",
              title: "Message",
              dataIndex: "message",
            },
            {
              key: "Sort Order",
              title: "Sort Order",
              dataIndex: "sort_order",
            },
            {
              key: "Action",
              title: "Action",
              render: (value) => {
                return (
                  <Space>
                    <Button type="primary" ghost>Edit</Button>
                    <Button  danger >Delete</Button>
                  </Space>
                );
              },
            },
          ]}
        ></Table>
      </Spin>
    </div>
  );
};

export default InvoiceStatus;
