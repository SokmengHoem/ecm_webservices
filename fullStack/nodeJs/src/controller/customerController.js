//call db 
const db = require("../util/db");

const getAll = (req, res) => {
   db.query("select * from customer", (error, rows) => {
    if(!error){
        res.json({
            list: rows
        })
    }
    else{
        res.json({
            error:true,
            message: error
        })
    }
   })
}

const getOne = (req, res) => {
    var {id} = req.params
    var sqlOne = "SELECT * FROM customer WHERE customer_id = ?";
    db.query(sqlOne,[id],(error, rows) => {
        if(!error){
            res.json({
                message: "One customer here",
                data:rows
            })
        }else{
            res.json({
                error:true,
                message:error
            })
        }
    })
}

const create = (req, res) => {
   var {
        firstname,
        lastname,
        gender,
        dob,
        tel,
        email,
        status
   } = req.body;

   var sqlInsert = "INSERT INTO customer (firstname, lastname, gender, dob, tel, email, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
   db.query(sqlInsert,[firstname, lastname, gender, dob,tel,email,status], (error, rows) => {
    if(!error){
        res.json({
            message: "Create Successfully",
            data:rows
        })
    }else{
        res.json({
            error:true,
            message:error
        })
    }
   })
}

const update = (req, res) => {
    var {
        customer_id,
        firstname,
        lastname,
        gender,
        dob,
        tel,
        email,
        status
   } = req.body;
   var sqlUpdate = "UPDATE customer SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, status=? WHERE customer_id = ?";
   var sqlParams = [firstname, lastname, gender, dob, tel, email, status, customer_id];
   db.query(sqlUpdate, sqlParams,(error, rows) => {
        if(!error){
            res.json({
                message: "Update successfully",
                data: rows
            })
        }else{
            res.json({
                error:true,
                message: error
            })
        }
   })
}

const remove = (req,  res) => {
    var {id} = req.params;
    var sqlDelete = "DELETE FROM customer WHERE customer_id = ?";
    db.query(sqlDelete,[id], (error, rows) => {
        if(!error){
           res.json({
              message: (rows.affectedRows != 0 ? "Custumer remove successfully" : "Customer not found"),
              data:rows
           })

        }else{
            res.json({
                error : true,
                message: error
            })
        }
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}