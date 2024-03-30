import React from 'react'


import SaleAndExpendChart from '../../components/chart/dashaboard/SaleAndExpendChart';
import CustomerActive from '../../components/chart/dashaboard/CustomerActive';

const HomePage = () => {
  return (
      <>  
        <SaleAndExpendChart/>
        <CustomerActive />
      </>
  )
}

export default HomePage