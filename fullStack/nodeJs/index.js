//http

const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors({origin:"*"}));


//import file route
const employee = require("./src/route/employeeRoute");
const customer = require("./src/route/customerRoute");
const category = require("./src/route/catagoryRoute");
const payment = require("./src/route/paymentRoute");
const invoiceStatus = require('./src/route/invoiceStatusRoute');
const role = require('./src/route/roleRoute');
const product = require ('./src/route/productRoute');
const shift = require ('./src/route/shiftRoute');
const shiftDetail = require('./src/route/shiftDetailRoute');
const invoice = require('./src/route/invoiceRoute');
const orderStatus = require('./src/route/orderStatusRoute');
const order = require('./src/route/orderRoute')

//call route
employee(app)
customer(app)
category(app)
payment(app)
invoiceStatus(app)
role(app)
product(app)
shift(app)
shiftDetail(app)
invoice(app)
orderStatus(app)
order(app)

const port = 8081;
app.listen(8081,()=>{
    console.log("http:localhost:"+port)
})


