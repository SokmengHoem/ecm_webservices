import { Button, Form, Input, Layout, Modal, Space, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { formatDateClient } from "../../share/Helper";

const RolePage = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(!loading);
    const res = await request("role", "get");
    setLoading(loading);
    if (res) {
      setList(res.lists);
    }
  };

  const onFinish = (values) => {

  }

  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
  };

  const onOpenModel = () => {
    setVisible(true);
  };

  const onClearForm = () => {
    form.resetFields();
  }

  return (
    <div>
      <Spin spinning={loading}>
        <div className=" flex justify-between mb-3">
          <h1 className=" font-bold text-2xl">Roles Page</h1>
          {/* <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />*/}
          <Button className=" bg-blue-700 text-white" onClick={onOpenModel}>
            New Role
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
              dataIndex: "Name",
            },
            {
              key: "Code",
              title: "Code",
              dataIndex: "Code",
            },
            {
              key: "Status",
              title: "Status",
              dataIndex: "Status",
            },
            {
              key: "CreateAt",
              title: "CreateAt",
              render: (value) => formatDateClient(value),
            },
            {
              key: "Action",
              title: "Action",
              render: (value) => {
                return (
                  <Space>
                    <Button type="primary" ghost>
                      Edit
                    </Button>
                    <Button danger>Delet</Button>
                  </Space>
                );
              },
            },
          ]}
        ></Table>
        <Modal
          open={visible}
          title={Id == null ? "New Role" : "Update Role"}
          onCancel={onCloseModal}
          footer={null}
        >
          <Form
          {...Layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          >
            <Form.Item
              name="Name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Code"
              label="Code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Status"
              label="Status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={24} className=" text-right">
              <Space>
                <Button htmlType="button" onClick={onCloseModal}>
                  Cancel
                </Button>
                <Button htmlType="button" onClick={onClearForm}>
                  Clear
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className=" text-blue-600 border-blue-600"
                >
                  {Id == null ? "Save" : "Update"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
};

export default RolePage;
