const db = require("../util/db")

const getAll = async (req, res) => {
    var sqlGet  = "SELECT * FROM category";
    const lists = await db.query(sqlGet);
    res.json({
        lists:lists
    })
}

const getOne = async (req, res) => {
  const {id} = req.params;
  var sqlOne = "SELECT * FROM category WHERE category_id = ?";
  var param = [id];
  const list = await db.query(sqlOne, param)
  res.json({
    list: list
  })
}

const create = async (req, res) => {
  const {
    name,
    description,
    status
  } = req.body;
  var sqlInsert ="INSERT INTO category (name, description,status) VALUES (?, ?, ?)";
  var param = [name, description, status];
  const data = await db.query(sqlInsert, param);
  res.json({
    message: "Insert Successfully",
    data:data
  })
}
 
const update = async (req, res) => {
    const {
        category_id,
        name,
        description,
        status
    } = req.body;
    var sqlUpdate = "UPDATE category SET name=? , description=? , status=? WHERE category_id =?";
    var params = [name, description, status, category_id];
    const data = await db.query(sqlUpdate, params);
    res.json({
        message: "Update suceessfully",
        data:data
    })
}

const remove = async (req, res) => {
  const {id} = req.params;
  var sqlDelete = "DELETE FROM category WHERE category_id=?";
  var param = [id];
  const data = await db.query(sqlDelete, param);
  res.json({
    message: data.affectedRows !=0 ? "Remove Successfully": "Category not found!!",

  })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
