const db = require('../util/db')

const getAll =async (req, res) => {
   const sqlGetData = "SELECT * FROM role";
   const lists = await db.query(sqlGetData);
   res.json({
    lists:lists
   })
}

const getOne =async (req, res) => {
    const {id} = req.params;
    const sqlOne = "SELECT * FROM role WHERE Id = ?";
    const profile = await db.query(sqlOne,[id]);
    res.json({
        profile:profile
    })
}

const create =async (req, res) => {
    const {
        Name,
        Code,
        Status
    } = req.body;
    const param = [Name, Code, Status];
    const sqlInsert = "INSERT INTO role (Name, Code, Status) VALUES (?, ?, ?)";
    const data = await db.query(sqlInsert, param);
    res.json({
        message : "Create Suceess!!!",
        data:data
    })
} 

const update =async (req, res) => {
    const {
        Id,
        Name,
        Code,
        Status
    } = req.body
    const param = [Name, Code, Status, Id];
    const sqlUpdate = "UPDATE role SET Name= ? , Code=?, Status=? WHERE Id =?";
    const data = await db.query(sqlUpdate,param);
    res.json({
        message: data.affectedRows !=0 ? "Update Successfully": "Role not found!!",
        data:data
    })
}

const remove =async (req, res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM role WHERE ID =?";
    const data = await db.query(sqlDelete,[id]);
    res.json({
        message: data.affectedRows !=0 ? "Delete Successfully": "Role not found!!",
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}