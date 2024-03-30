

import React from 'react'
import {Chart} from "react-google-charts"

const SaleAndExpendChart = () => {
    const data = [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 900, 200],
        ["2015", 1170, 450, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350]
    ]
    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        }
    }
  return (
    <div>
        <Chart 
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    </div>
  )
}

export default SaleAndExpendChart