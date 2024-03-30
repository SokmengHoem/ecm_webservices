import React, { useEffect, useRef, useState } from "react";
import { request } from "../../share/request";
import {
  Button,
  Space,
  Table,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  Spin,
  message,
  Popconfirm,
  Col,
  Row,
} from "antd";
import { IoMdCloseCircle } from "react-icons/io";
import { Config, formatDateClient, formatDateServer } from "../../share/Helper";

const { Option } = Select;
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

const EmployeePage = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [imagePre, setImagePre] = useState(null);
  const [image, setImage] = useState(null);
  const [listRole, setListRole] = useState([])

  const refMyImage = useRef();

  useEffect(() => {
    getList();
    getListRole();
  }, []);
  const getListRole =async () => {
    const res =await request("role", "get")
    if(res){
      setListRole(res.lists);
    }
  }
  const getList = async () => {
    setLoading(true);
    var param = "";
    if (textSearch != "") {
      param = "?textSearch=" + textSearch;
    }
    const res = await request("employee" + param, "get", {});
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };

  const onNewEmployee = () => {
    setVisible(true);
  };
  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };

  const onFinish = async (values) => {
    //get value from form
    //can get data from form then past to api
    var formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("gender", values.gender);
    formData.append("tel", values.tel);
    formData.append("email", values.email);
    formData.append("dob", values.dob);
    formData.append("address", values.address);
    formData.append("roleId", values.roleId);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("image_emp", image, image.filename);
    } else {
      // formData.append("image_emp",  null)
      // if(imagePre == null){
      //   formData.append("isRemove", null)
      // }
    }
    var method = "post";
    if (id != null) {
      //mean update
      formData.append("employee_id", id);
      method = "put";
    }

    const res = await request("employee", method, formData);
    if (!res.error) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
    } else {
      message.error(res.message);
    }
  };

  const onDelete = async (rows) => {
    var param = {
      id: rows.employee_id,
      image: rows.image,
    };
    const res = await request("employee", "delete", param);
    if (!res.error) {
      getList();
    } else alert(res.message);
  };

  const onClickEdit = (item) => {
    setId(item.employee_id);
    form.setFieldsValue({
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender + "",
      tel: item.tel,
      email: item.email,
      dob: formatDateServer(item.dob),
      address: item.address,
      roleId: item.roleId,
      image: item.image,
    });
    setImagePre(Config.image_path + item.image);
    setVisible(true);
  };

  const onClearForm = () => {
    form.resetFields();
    refMyImage.current.value = null;
    setImagePre(null);
    setImage(null);
  };

  const onSearch = (value) => {
    getList();
  };

  const onChangeTeaxtSearch = (e) => {
    setTextSearch(e.target.value);
  };

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file));
  };

  const onRemoveUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: null,
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <div className=" flex justify-between mb-3">
          <h1 className=" font-bold text-2xl">Employee Page</h1>
          <Input.Search
            className=" w-1/3"
            allowClear
            onSearch={onSearch}
            onChange={onChangeTeaxtSearch}
          />
          <Button className=" bg-blue-700 text-white" onClick={onNewEmployee}>
            New Employee
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={[
            {
              key: "No",
              title: "No",
              dataIndex: "employee_id",
              render: (value, item, index) => index + 1, //for map form db
            },
            {
              key: "ID",
              title: "ID",
              dataIndex: "employee_id",
            },
            {
              key: "Firstname",
              title: "Firstname",
              dataIndex: "firstname", //for map form db
            },
            {
              key: "Lastname",
              title: "Lastname",
              dataIndex: "lastname", //for map form db
            },
            {
              key: "Gender",
              title: "Gender",
              dataIndex: "gender", //for map form db
              render: (value, item, index) => (value == 1 ? "Male" : "Female"),
            },
            {
              key: "Image",
              title: "Image",
              dataIndex: "image", //for map form db
              render: (value, rows, index) => {
                return (
                  <div>
                    {(value != null && value != "") ?
                    <img
                    src={Config.image_path + value}
                    alt=""
                    className=" w-[80px]"
                  />
                  :
                  <div className=" w-15 h-12 bg-slate-300"></div>
                }
                  </div>
                );
              },
            },
            {
              key: "Tel",
              title: "Tel",
              dataIndex: "tel", //for map form db
            },
            {
              key: "Email",
              title: "Email",
              dataIndex: "email", //for map form db
            },
            {
              key: "Dob",
              title: "Dob",
              dataIndex: "dob", //for map form db
              render: (value) => formatDateClient(value),
            },
            {
              key: "Address",
              title: "Address",
              dataIndex: "address", //for map form db
            },
            {
              key: "RoleName",
              title: "RoleName",
              dataIndex: "RoleName", //for map form db
              render: (value) => {
                return <Tag color="blue">{value}</Tag>;
              },
            },
            {
              key: "Action",
              title: "Action",
              dataIndex: "create_at", //for map form db
              render: (value, item, index) => {
                return (
                  <Space key={index}>
                    <Button
                      type="primary"
                      className=" bg-blue-600"
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
          title={id == null ? "New Employee" : "Update Employee"}
          onCancel={onCloseModal}
          footer={null}
          width={800}
        >
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            // style={{
            //   maxWidth: 600,
            // }}
          >
            <Row gutter={5} className=" mt-10">
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Firstname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Please select gender"
                    allowClear={true}
                    onChange={() => {}}
                  >
                    <Option value={"1"}>Male</Option>
                    <Option value={"0"}>Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tel"
                  label="Tel"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="email" label="Email">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="dob" label="Dob">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="roleId"
                  label="Role"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select role">
                    {
                      listRole.map((item, index) => {
                        return(
                          <Option key={index} value={item.Id}>{item.Name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Select picture"
                  // name={"image"}
                >
                  <input type="file" ref={refMyImage} onChange={onChangeFile} />
                </Form.Item>
                <Form.Item>
                  <img src={imagePre} alt="" className=" w-[120px] h-28  ml-20" />
                  {(id != null && imagePre != null )&& (
                    <button onClick={onRemoveUpdate}><IoMdCloseCircle size={22} color="red"/></button>
                  )}
                </Form.Item>
              </Col>
            </Row>

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

export default EmployeePage;
