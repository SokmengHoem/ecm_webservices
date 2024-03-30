
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./page/home/HomePage";
import AboutPage from "./page/about/AboutPage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import Layout from "./components/layout/Layout";
import CategoryPage from "./page/category/CategoryPage";
import CustomerPage from "./page/customer/CustomerPage";
import EmployeePage from "./page/employee/EmployeePage";
import LayoutLogin from "./components/layout/LayoutLogin";
import PaymentMethod from "./page/payment/PaymentMethod";
import InvoiceStatus from "./page/invoice/InvoiceStatus";
import RolePage from "./page/role/RolePage";
import ProductPage from "./page/product/ProductPage";
import ShiftPage from "./page/shift/ShiftPage";
import ShiftDetailPage from "./page/shift/ShiftDetailPage";
import POSPage from "./page/pos/POSPage";
import OrderPage from "./page/order/OrderPage";
import ProductAlertPage from "./page/product/ProductAlertPage";

function App() {

 
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="" element={<HomePage/>} />
                  <Route path="category" element={<CategoryPage/>}/>
                  <Route path="product" element={<ProductPage/>} />
                  <Route path="customer" element={<CustomerPage/>}/>
                  <Route path="employee" element={<EmployeePage/>}/>
                  <Route path="payment_method" element={<PaymentMethod/>}/>
                  <Route path="invoice_status" element={<InvoiceStatus/>}/>
                  <Route path="role" element={<RolePage/>} />
                  <Route path="shift" element={<ShiftPage/>} />
                  <Route path="shiftDetail" element={<ShiftDetailPage/>} />
                  <Route path="pos" element={<POSPage/>} />
                  <Route path="order" element={<OrderPage/>} />
                  <Route path="product-alert" element={<ProductAlertPage/>} />
                  <Route path="*" element={<h1>Route not Found</h1>} />
              </Route>
              <Route path="/" element={<LayoutLogin/>}>
                  <Route path="login" element={<LoginPage/>} />
                  <Route path="register" element={<RegisterPage/>} />
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
