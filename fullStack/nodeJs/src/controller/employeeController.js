const db = require('../util/db');
const bcrypt = require('bcrypt');
const { removeFile } = require('../util/helper');

const getAll = async(req, res) => {

    const {textSearch} = req.query;
   // var sqlEmp = "SELECT * FROM employee";
    var sqlEmp = "SELECT "+
	" e.*,"+
   " r.Name as RoleName"+
 " FROM employee as e"+
 " INNER JOIN role as r ON e.roleId = r.Id ";
   // var sqlWhere = " WHERE firstname LIKE '%'"+textSearch+"'%'";
    if(textSearch != null && textSearch != ""){
        sqlEmp += " WHERE firstname LIKE '%"+textSearch+"%' OR lastname LIKE '%"+textSearch+"%'";
    }

    sqlEmp += "ORDER BY employee_id DESC"

    const listEmp = await db.query(sqlEmp);
    const total = await db.query(" SELECT COUNT(employee_id) as Total From employee;")
    res.json({
        list: listEmp,
        totalRecord:total
    })
}

const getOne = (req,res) => {
   var {id} = req.params;
   var sqlOne = "SELECT * FROM employee WHERE employee_id = ?";
   db.query(sqlOne, [id], (error, rows) => {
      if(!error){
            res.json({
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

const create= (req,res) => {
    var {
        firstname,
        lastname,
        gender,
        tel,
        email,
        dob,
        address,
        roleId
    } = req.body;
    var filename = null
    if(req.file){
        filename = req.file.filename
    }
   
    var sqlInsert = "INSERT INTO employee (firstname, lastname, gender, image, tel, email, dob, address, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    var sqlParams = [firstname, lastname, gender, filename, tel, email, dob, address, roleId];
    db.query(sqlInsert, sqlParams, (error, rows) => {
        if(!error){
            res.json({
                message: (rows.affectedRows != 0 ? "Employee insert successfully" : "Something wong"),
                data:rows
            })
        }else{
        res.json(
           {
               error:true,
               message:error
           } 
        )
        }
    })
}

const update= (req,res) => {
   const {
        firstname,
        lastname,
        gender,
        tel,
        email,
        dob,
        address,
        roleId,
        image,
        is_remove_file,
        employee_id
   } = req.body;

   var filename = null
   if(req.file){
    filename = req.file.filename
   }else{
    filename = image
   }
   
   db.query("SELECT * FROM employee WHERE employee_id = ?",[employee_id,],(error1, row1) => {
   
    if(!error1){
        var sqlPut = "UPDATE employee SET firstname=?, lastname=?, gender=?, image=?, tel=?, email=?, dob=?, address=?, roleId=? WHERE employee_id =?";
        var params = [firstname, lastname, gender,filename, tel, email, dob, address, roleId, employee_id,];
        db.query(sqlPut, params, (error, rows) => {
            if(!error){
                if(rows.affectedRows != 0){
                    if(req.file || (filename ==null)){
                        if(row1[0].image != null && row1[0].image != ""){
                            removeFile(row1[0].image) //remove image in server that updateed
                        }
                    }
                }
                res.json({
                    message: (rows.affectedRows != 0 ? "Employee Update successfully" : "Employee not found"),
                    data:rows,
                    is_remove_file:is_remove_file
                })
               
               
            }else{
                res.json({
                    error:true,
                    message: error
                })
            }
       })
    }
   })

}

const remove = (req,res) => {
    var {id, image} = req.body;
    var sqlDelete = "DELETE FROM employee WHERE employee_id =?";
    db.query(sqlDelete,[id], (error, rows) => {
        if(!error){
            if(rows.affectedRows != 0){
                removeFile(image)
            }
            res.json({
                message: (rows.affectedRows != 0 ? "Employee remove successfully" : "Employee not found"),
                data:rows
             })
        } else{
            res.json({
                error : true,
                message: error
            })
        }
          

    })
}

const setPassword = async (req, res) => {
    const {
        tel,
        password,
        confirmPassword
    } = req.body;
    var message = {};
    if(tel == null || tel == ""){
        message.tel = "Tel required"
    }
    if(password == null || password == ""){
        message.password = "Password required"
    }else{
        if(password != confirmPassword){
            message.password = "Password not match"
        }
    }
    if(Object.keys(message).length >0){
        res.json({
            message :message
        })
        return false;
    }


    const user = await checkIsExistUser(tel);
    if(!user){
        res.json({
            message : "User does not exist"
        })
    }else{
        const hashPassword = await bcrypt.hashSync(password,10)
        var sql = "UPDATE employee SET password = ? WHERE tel =?";
        const data = await db.query(sql,[hashPassword, tel]);
        delete user.password;
        res.json({
            message : data.affectedRows ? "Password success!" : "Something wrong!",
            profile : user
        });
   }
    
   
}

const checkIsExistUser = async (tel) => {
    const user = await db.query("SELECT * FROM `employee` WHERE tel = ?",[tel])
    if(user){
        return user[0];
    }else{
        return null;
    }
}

const login = async (req, res) => {
    const {
        tel,
        password
    }= req.body;
    var message = {};
    if(tel == null || tel == ""){
        message.tel = "Please input username"
    }
    if(password == null || password == ""){
        message.password = "Please input your password"
    }
    if(Object.keys(message).length >0){
        res.json({
            message :message
        })
        return false;
    }
    const user = await checkIsExistUser(tel);
    if(!user){
        res.json({
            message: "Username or password Incorrect",
        })
    }else{
        const isCorrectPassword = await bcrypt.compareSync(password, user.password)
        delete user.password
        res.json({
            isSuccess : isCorrectPassword ? true : false,
            message: isCorrectPassword ? "Login success" : "Username or password Incorrect",
            profile:isCorrectPassword ? user : null
        })
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    setPassword,
    login
}