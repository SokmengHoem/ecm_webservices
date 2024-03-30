import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { request } from "../../share/request";
import { Config, lists } from "../../share/Helper";
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import { IoMdCloseCircle } from "react-icons/io";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ProductPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoadig] = useState(false);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [totalRecord, setTotalRecord] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);

  const [objFilter, setObjFilter] = useState({
    page: 1,
    textSearch: "",
  });

  useEffect(() => {
    getList(objFilter);
    getListCategory();
  }, []);

  const getListCategory = async () => {
    const res = await request("category", "get", {});
    if (res) {
      setListCategory(res.lists);
    }
  };

  const getList = async (paramObjFilter) => {
    setLoadig(true);
    var param = "?page=" + paramObjFilter.page;
    param += "&textSearch=" + paramObjFilter.textSearch;
    const res = await request("product" + param, "get");
    setLoadig(false);
    if (res) {
      setList(res.lists);
      setTotalRecord(res.total[0].Total);
    }
  };

  const onSave = () => {};

  const onOpenModel = () => {
    setVisible(true);
    setId(null)
  };

  const onCloseModal = () => {
    setVisible(false);
    setImagePre(null)
    form.resetFields();
    setId(null);
  };

  const onSearch = (value) => {
    var objTmp = {
      ...objFilter,
      textSearch: value,
      page: value == "" ? 1 : objFilter.page,
    };
    setObjFilter(objTmp);
    getList(objTmp);
  };

  const onChangeTeaxtSearch = () => {};

  const onFinish = async (value) => {
    try {
      var formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("category_id", value.category_id);
      formData.append("price", value.price);
      formData.append("quantity", value.quantity);
      formData.append("is_active", value.is_active);
      formData.append("image_product", null);
      if (image != null) {
        formData.append("image_product", image, image.filename);
      }

      var method = "post";
    if (id != null) {
      //mean update
      formData.append("id", id);
      method = "put";
    }

      const res = await request("product", method, formData);
      if (res) {
        onCloseModal();
        message.success(res.message);
        getList(objFilter);
      }
    } catch (error) {
      // alert("dddd");
    }
  };

  const onChangePage = (page) => {
    var objTmp = {
      ...objFilter, // keep orignal value
      page: page,
    };
    setObjFilter(objTmp);
    getList(objTmp);
  };

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file));
  };

  const onClickEdit = (item) => {
    setId(item.id);
    form.setFieldsValue({
      name: item.name,
      description: item.description,
      category_id: item.category_id,
      price: item.price,
      quantity: item.quantity,
      is_active: item.is_active + "",
      image: item.image,
    });
    setImagePre(Config.image_path + item.image);
    setVisible(true);
  };

  const onRemoveUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: null,
    });
  };

  const onDelete =async (rows) => {
      var param ={
        id: rows.id,
        image: rows.image
      };
      const res = await request("product", "delete", param);
      if (!res.error) {
        message.success(res.message);
        getList(objFilter);
      }
      else {
        message.error(res.message);
      }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <div className=" flex justify-between mb-3 ">
          <h1 className=" font-bold text-2xl">Products Page</h1>
          <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />
          <Button className=" bg-blue-700 text-white" onClick={onOpenModel}>
            New Product
          </Button>
        </div>
        <Table
          pagination={{
            total: totalRecord,
            pageSize: 3,
            onChange: onChangePage,
          }}
          dataSource={list}
          columns={[
            {
              key: "No",
              title: "No",
              render: (value, item, index) => index + 1,
            },
            {
              key: "ID",
              title: "ID",
              dataIndex: "id",
            },
            {
              key: "Name",
              title: "Name",
              dataIndex: "name",
            },
            {
              key: "Category_Id",
              title: "Category Name",
              dataIndex: "category_Name",
            },
            {
              key: "Description",
              title: "Descrition",
              dataIndex: "description",
            },
            {
              key: "Price",
              title: "Price",
              dataIndex: "price",
            },
            {
              key: "Quantity",
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              key: "Image",
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
                    ) : (
                      <div className=" w-24 h-24 bg-slate-200"></div>
                    )}
                  </div>
                );
              },
            },
            {
              key: "Is_Active",
              title: "Status",
              dataIndex: "is_active",
              render: (value) => (value == 1 ? <Tag color="green">Active</Tag> : <Tag color="pink">Disabled</Tag>),
            },
            {
              key: "Action",
              title: "Action",
              render: (value, item, index) => {
                return (
                  <Space key={index}>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => onClickEdit(item)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete this record?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onDelete(item)}
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </Space>
                );
              },
            },
          ]}
        ></Table>
        <Modal
          open={visible}
          title={id == null ? "New Product" : "Update Product"}
          onCancel={onCloseModal}
          footer={null}
          maskClosable={false}
          width={800}
        >
          <Divider />
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name={"name"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Product name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Description"
                  name={"description"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Product Descrition" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="CategoryName"
                  name={"category_id"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="select category" allowClear>
                    {listCategory.map((item, index) => (
                      <Select.Option key={index} value={item.category_id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name={"price"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber placeholder="Price" className=" w-full" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name={"quantity"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Product Quantity"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Is Active"
                  name={"is_active"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select status">
                    <Select.Option value={"1"}>Active</Select.Option>
                    <Select.Option value={"0"}>Disable</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Image"
                  // name={"image"}
                >
                  <Input
                    onChange={onChangeFile}
                    type="file"
                    placeholder="Product Image"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <img
                    src={imagePre}
                    alt=""
                    className=" w-[120px] h-28  ml-20"
                  />
                  {id != null && imagePre != null && (
                    <button onClick={onRemoveUpdate}>
                      <IoMdCloseCircle size={22} color="red" />
                    </button>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className=" flex justify-end">
              <Space>
                <Button danger onClick={onCloseModal}>
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary" ghost>
                  {id == null ? "Save" : "Update"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
};

export default ProductPage;
