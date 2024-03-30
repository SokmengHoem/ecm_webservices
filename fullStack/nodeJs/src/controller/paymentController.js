const db = require("../util/db")

const getAll = async (req, res) => {
    var sqlGet  = "SELECT * FROM payement_methode";
    const list = await db.query(sqlGet);
    res.json({
        list:list
    })
}

const getOne = async (req, res) => {
  const {id} = req.params;
  var sqlOne = "SELECT * FROM payement_methode WHERE id = ?";
  var param = [id];
  const list = await db.query(sqlOne, param)
  res.json({
    list: list
  })
}

const create = async (req, res) => {
  const {
    name,
    code,
    image,
    is_active
  } = req.body;
  var sqlInsert ="INSERT INTO payement_methode (name, code, image, is_active) VALUES (?, ?, ?, ?)";
  var param = [name, code, image, is_active];
  const data = await db.query(sqlInsert, param);
  res.json({
    message: "Insert Successfully",
    data:data
  })
}
 
const update = async (req, res) => {
    const {
        id,
        name,
        code,
        image,
        is_active
    } = req.body;
    var sqlUpdate = "UPDATE payement_methode SET name=? , code=? , image=? , is_active=? WHERE id =?";
    var params = [name, code, image, is_active, id];
    const data = await db.query(sqlUpdate, params);
    res.json({
      message: data.affectedRows !=0 ? "Update Successfully": "Category not found!!",
        data:data
    })
}

const remove = async (req, res) => {
  const {id} = req.params;
  var sqlDelete = "DELETE FROM payement_methode WHERE id=?";
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
