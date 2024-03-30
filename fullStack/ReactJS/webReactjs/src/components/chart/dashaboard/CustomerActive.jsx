
import React, { useEffect } from 'react'
import {Chart} from "react-google-charts"
import { request } from '../../../share/request'

const CustomerActive = () => {

    useEffect(() => {

    }, [])

    const getList = async () => {
      const res = await request("report/customerActive", "get")
    }

    const data = [
        ["Year", "Active"],
        ["2014", 1000],
        ["2015", 1170],
        ["2016", 660],
        ["2017", 1030]
    ]
    const options = {
        chart: {
            title: "Customer Active",
            subtitle: "Customer Active From  01-23 / 01-23",
        }
    }
  return (
    <div>
        <Chart 
            chartType="Line"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    </div>
  )
}

export default CustomerActive