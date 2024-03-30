const db = require('../util/db')

const getAll = async (req, res) => {
  const sqlGetData = "SELECT * FROM order_status";
  const lists = await db.query(sqlGetData);
  res.json({
   lists:lists
  })
}

const getOne = async (req, res) => {
    const {id} = req.params;
    const sqlGetOne = "SELECT * FROM order_status WHERE id =?";
    const list = await db.query(sqlGetOne, [id]);
    res.json({
        list:list
    })
}

const create = async (req, res) => {
    const{name , message, sort_order} = req.body;
    const sqlInsert = "INSERT INTO order_status (name, message, sort_order) VALUES (?,?,?)";
    const param = [name, message, sort_order];
    const data = await db.query(sqlInsert, param);
    res.json({
        message: "Insert Successfully",
        data:data
    })
}

const update = async (req, res) => {
    const {id, name, message, sort_order} = req.body;
    const sqlUpdate = "UPDATE order_status SET name =?, message =?, sort_order =? WHERE id =?";
    const param = [name, message, sort_order, id];
    const data = await db.query(sqlUpdate, param);
    res.json({
        message: data.affectedRows!=0? "Update Successfully": "Order Status not found!!",
        data:data
    })
}

const remove = async (req, res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM order_status WHERE id =?";
    const param = [id];
    const data = await db.query(sqlDelete, param);
    res.json({
        message: data.affectedRows!=0? "Remove Successfully": "Category not found!!",
        data:data
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}