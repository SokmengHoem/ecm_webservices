const db = require('../util/db')
 
const getAll =async (req, res) => {
    const sqlGet = "SELECT * FROM shift";
    const lists = await db.query(sqlGet);
    res.json({
        lists:lists
    })
}

const getOne =async (req, res) => {
    const {id} = req.params
    const sqlGetOne = "SELECT * FROM shift WHERE id = ?";
    const list = await db.query(sqlGetOne, [id]);
    res.json({
        list:list
    })
}

const create =async (req, res) => {
    const {
        name,
        description
    }= req.body;
    const param = [name, description];
    const sqlPost = "INSERT INTO shift (name, description ) VALUES (?, ?)";
    const data = await db.query(sqlPost,param)
    res.json({
        message: "Insert success!!!",
        data:data
    })
}

const update =async (req, res) => {
    const {
        name,
        description,
        id
    }= req.body;
    const param = [name, description,id];
    const sqlPut = "UPDATE shift SET name=? , description=? WHERE id =?";
    const data = await db.query(sqlPut,param)
    res.json({
        message: data.affectedRows != 0 ? "Update Successfully": "Shift not found"
    })
}

const remove =async (req, res) => {
    const {id} = req.params
    const sqlDelete = "DELETE FROM shift WHERE id =?"
    const data = await db.query(sqlDelete, [id]);
    res.json({
        message: data.affectedRows != 0 ? "Shift Delete Success" : "Shift not found"
    })
}

module.exports = {
    getAll,
    getOne,
    create, 
    update,
    remove
}