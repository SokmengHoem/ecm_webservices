import React, { useEffect, useState } from 'react'
import { request } from '../../share/request'
import { Spin, Table } from 'antd'
import { formatDateServer } from '../../share/Helper'

const OrderPage = () => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [sumResult, setSumResult] = useState(null)
    
    useEffect(() => {
        getList()
    }, [])
    
    const getList = async () => {
        setLoading(!loading)
        const res = await request("order", "get")
        setLoading(loading)
        if (res) {
            setList(res.lists)
            setSumResult(res.sumResult)
        }
    }

  return (
    <div>
        <div>
            <div className=' text-2xl font-bold'>
                List Order
            </div>
            <div>
                Total Order: {sumResult?.TotalRecord}
            </div>
            <div>Total Amount: <b>$ {sumResult?.TotalAmount.toFixed(2)}</b> </div>
        </div>
        <Spin spinning={loading}>
            <Table dataSource={list} columns={[
                {
                    key: 'No',
                    title: 'No',
                    render: (value, item, index) => index + 1
                },
                {
                    key: 'Customer_Name',
                    title: 'Customer_Name',
                    dataIndex: 'customer_name'
                },
                {
                    key: 'payement_methode',
                    title: 'Payement_Methode',
                    dataIndex: 'payement_methode'
                },
                {
                    key: 'order_status',
                    title: 'Order_Status',
                    dataIndex: 'order_status'
                },
                {
                    key: 'employee_name',
                    title: 'Employee_Name',
                    dataIndex: 'employee_name'
                },
                {
                    key: 'Note',
                    title: 'Note',
                    dataIndex: 'note'
                },
                {
                    key: 'total',
                    title: 'Total',
                    dataIndex: 'total',
                    render: (value) => "$"+(value.toFixed(2))
                },
                {
                    key: 'create_at',
                    title: 'Create_At',
                    render: (value) => formatDateServer(value)
                }
            ]}>

            </Table>
        </Spin>

    </div>
  )
}

export default OrderPage