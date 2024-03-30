import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Spin, Table ,Button} from "antd";
import { formatDateClient } from "../../share/Helper";

const PaymentMethod = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const res = await request("payment_method", "get");
    setLoading(false);
    if (res) {
      setList(res.list);
      console.log(res.list);
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
      <div className=" flex justify-between mb-3">
          <h1 className=" font-bold text-2xl">Payments Page</h1>
          {/* <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />*/}
          <Button className=" bg-blue-700 text-white" >
            New Payment
          </Button> 
        </div>
        <Table
          dataSource={list}
          columns={[
            {
              key: "No",
              title: "No",
              render: (value, items, index) => index + 1,
            },
            {
              key: "Name",
              title: "Name",
              dataIndex: "name",
            },
            {
              key: "Code",
              title: "Code",
              dataIndex: "code",
            },
            {
              key: "Image",
              title: "Image",
              dataIndex: "image",
            },
            {
              key: "Is_Active",
              title: "Is_Active",
              dataIndex: "is_active",
            },
            {
              key: "Create_at",
              title: "Create_at",
              dataIndex: "create_at",
              render:(value) => formatDateClient(value)
            },
          ]}
        ></Table>
      </Spin>
    </div>
  );
};

export default PaymentMethod;
