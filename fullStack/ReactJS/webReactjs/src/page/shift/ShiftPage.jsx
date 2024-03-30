import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Button, Space, Spin, Table } from "antd";
import { formatDateClient } from "../../share/Helper";
import Item from "antd/es/list/Item";

const ShiftPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoadig] = useState(false)

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoadig(true)
    const res = await request("shift", "get");
    setLoadig(false)
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
          <h1 className=" font-bold text-2xl">Shift Page</h1>
          {/* <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />*/}
          <Button className=" bg-blue-700 text-white" onClick={onOpenModel}>
            New shift
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={ [
            {
              key:"No",
              title:"No",
              render:(value, item, index) => index + 1
            },
            {
              key:"Name",
              title: "Name",
              dataIndex: "name"
            },
            {
              key:"Description",
              title: "Desciption",
              dataIndex: "description"
            },
            {
              key:"Create At",
              title: "Create At",
              render: (value) => formatDateClient(value)
            },
            {
              key:"Action",
              title: "Action",
              render: (value, item, index) => {
                return <Space>
                    <Button type="primary" ghost>Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
              }
            }
          ]}
        >

        </Table>
      </Spin>
    </div>
  );
};

export default ShiftPage;
