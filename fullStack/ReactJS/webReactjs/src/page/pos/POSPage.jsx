import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { request } from "../../share/request";
import { Config, getUserId, lists } from "../../share/Helper";
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
import Item from "antd/es/list/Item";
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

const POSPage = () => {
  const [list, setList] = useState([]);
  const [listCustomer, setListCustomer] = useState([]);
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const [listOrderStatus, setListOrderStatus] = useState([])
  const [textSearchId, setTextSearchId] = useState([]);
  
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)

  const [customerId, setCustomerId] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null)
  const [orderStatusId, setOrderStatusId] = useState(null)

  useEffect(() => {
      initInfo()
  }, []);

  const initInfo =async () => {
    const res = await request("orderPos", "get",{})
    if (res) {
      setListCustomer(res. customer)
      setListPaymentMethod(res. payment_method)
      setListOrderStatus(res.order_status)
    }
  }

  const getList = async (paramId) => {
    const param = {
        id:paramId
    }
    const res = await request("product/"+paramId, "get",);
    if (res && res.lists.length > 0) {
    var listTmp = res.lists;//concate data from api + current list

    // check stock
    if(listTmp[0].quantity < 1){
      message.info("Product out of stock!");
      return
    }

    if(listTmp.length > 0) {
      listTmp[0].qty = 1;
    }

    //find is existing product id => update qty 
    var isExisting =0;
    for(var i =0; i< list.length; i++)
    {
      if(list[i].id == listTmp[0].id){
        isExisting = 1; 
        if(list[i].qty == listTmp[0].quantity) {
          message.info("Product have only "+listTmp[0].quantity);
          listTmp = [...list];
          break;
          
        }
        list[i].qty = list[i].qty + 1;
        listTmp = [...list]
        
        break;
      }
    }

    if(isExisting == 0){
      listTmp= [...listTmp, ...list]
    }
    //find subTotal and Total
      var sub_total = 0;
      listTmp.map((item, index) =>{
        sub_total = sub_total + (item.price * item.qty);
      });
      var total = sub_total;
      //end find subTotal and Total

      

      setSubTotal(sub_total);
      setTotal(total);
      setList(listTmp);
      setTextSearchId("")
    }else{
      message.info("Product not found")
    }
  };

  const onSearchProductId = (value) => {
    if(value !== "" && value !== null){
      getList(value);
    }
    
  };

  const onCheckout = () => {
    if(list.length == 0){
      message.info("Please select product")
      return;
    }
    var param = {
      customer_id: customerId,
      user_id: getUserId(),
      order_status_id: orderStatusId,
      payment_method_id: paymentMethodId,
      total:total,
      note: "",
      is_paid:true,
      array_product: list
    }
    const res = request("order", "post", param);
    if (res){
      message.success(res.message);
      setList([]);
    }else{
      message.error("Something Wrong");
    }
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold mb-2">POS</h1>
      <Row gutter={16}>
        <Col span={16} className="border border-gray-300">
          <div>
            <Input.Search
            value={textSearchId}
              placeholder="Product Id "
              className=" w-80 mt-3"
              onSearch={onSearchProductId}
              onChange={(e) =>{
                setTextSearchId(e.target.value)
              }}
              allowClear={true}
            />
          </div>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between bg-slate-300 mt-4 px-3 py-2 rounded-xl"
              >
                <div className="flex flex-row items-center">
                  <div>
                    <Image
                      src={Config.image_path + item.image}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className=" ml-2">
                    <div className=" font-bold">ID : {item.id}</div>
                    <div className=" font-bold">{item.name}</div>
                    <div>{item.description}</div>
                    {
                      item.quantity > 2 ?
                      <Tag color="green" className="mt-1">
                         {item.quantity} Available in stock 
                      </Tag>
                      :
                      <Tag color="red" className="mt-1">
                         {item.quantity} left in stock
                      </Tag>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-red-700 font-bold">
                    {"$" + item.price.toFixed(2)}
                  </div>
                  <div className=" font-bold">Qty : {item.qty}</div>
                </div>
              </div>
            );
          })}
        </Col>
        <Col span={8} className="border border-gray-300">
        <div className=" p-2 ">
          <div className=" text-xl  font-bold mb-2">Summary</div>
          <Select value={customerId} onSelect={(value) => setCustomerId(value)} placeholder="Customer" className=" w-full mb-2">
            {listCustomer.map((item, index) => {
              return (
                <Select.Option key={index} value={item.customer_id} >
                  {item.firstname} {item.lastname}
                </Select.Option>
              );
            })}
          </Select>
          <Select value={paymentMethodId} onSelect={(value) => setPaymentMethodId(value)} placeholder="Payment Method" className=" w-full mb-2">
            {listPaymentMethod.map((item, index) => {
              return (
                <Select.Option key={index} value={item.id} >
                  {item.name} 
                </Select.Option>
              );
            })}
          </Select>
          <Select value={orderStatusId} onSelect={(value) => setOrderStatusId(value)} placeholder="Order Status" className=" w-full mb-2">
            {listOrderStatus.map((item, index) => {
              return (
                <Select.Option key={index} value={item.id} >
                  {item.name} 
                </Select.Option>
              );
            })}
          </Select>
          
            <div className=" flex justify-between mt-1">
              <div className=" font-bold">Sub Total</div>
              <div className="text-red-500 font-bold">{"$" + subTotal.toFixed(2)}</div>
            </div>
            <div className=" flex justify-between mt-2">
              <div className=" font-bold">Discount</div>
              <div><InputNumber size="small" value={0} /></div>
            </div>
            <div className=" flex justify-between mt-2">
              <div className=" font-bold">Tax</div>
              <div><InputNumber size="small" value={0} /></div>
            </div>
            <Divider />
            <div className=" flex justify-between">
              <div className=" font-bold">Total</div>
              <div className="text-red-500 font-bold">{"$" + total.toFixed(2)}</div>
            </div>
            <Button block onClick={onCheckout}  className=" bg-blue-500 text-white mt-3">Checkout</Button>
          </div>
        </Col>
      </Row>

     
    </div>
  );
};

export default POSPage;
