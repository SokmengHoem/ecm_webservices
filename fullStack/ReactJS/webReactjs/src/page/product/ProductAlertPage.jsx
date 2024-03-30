import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Image, Spin, Table, Tag } from "antd";
import { Config, formatDateClient } from "../../share/Helper";

const ProductAlertPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);

    const res = await request("product-alert-stock", "get");
    setLoading(false);
    if (res) {
      setList(res.list);
      //  console.log(res.list)
    }
  };
  return (
    <div>
      <div>
        <div>ProductAlertPage</div>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={list}
          columns={[
            {
              title: "No",
              key: "no",
              render: (value, item, index) => index + 1,
            },
            {
              title: "Category_Id",
              key: "category_id",
              dataIndex: "category_id",
            },
            {
              key: "name",
              title: "Name",
              dataIndex: "name",
            },
            {
              key: "description",
              title: "Description",
              dataIndex: "description",
            },
            {
              key: "price",
              title: "Price",
              dataIndex: "price",
            },
            {
              key: "quantity",
              title: "Quantity-alert-Stock",
              dataIndex: "quantity",
              render: (value) => <Tag color="red" className=" font-bold">{value} left in stock</Tag>
            },
            {
              key: "image",
              title: "Image",
              dataIndex: "image",
              render: (value) => {
                return (
                  <div>
                    {value != "" && value != null ? (
                      <div>
                        <Image
                          width={100}
                          height={100}
                          src={Config.image_path + value}
                          alt=""
                        />
                      </div>
                    ) : null}
                  </div>
                );
              },
            },
            {
              key: "Is_Active",
              title: "Status",
              dataIndex: "is_active",
              render: (value) =>
                value == 1 ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="pink">Disabled</Tag>
                ),
            },
            {
              key: "create_at",
              title: "Create_at",
              dataIndex: "create_at",
              render: (value) => formatDateClient(value),
            },
          ]}
        ></Table>
      </Spin>
    </div>
  );
};

export default ProductAlertPage;
