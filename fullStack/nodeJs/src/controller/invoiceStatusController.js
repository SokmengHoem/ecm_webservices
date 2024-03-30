const db = require('../util/db')

const getAll = async (req, res) => {
    const sqlGetAll = "SELECT * FROM invoice_status";
    const list = await db.query(sqlGetAll)
    res.json({
        lists:list
    })

}

const getOne =async (req, res) => {
    const {id} = req.params
   sqlGetOne = "SELECT * FROM invoice_status WHERE id = ?";
   const profile = await db.query(sqlGetOne,[id]);
   res.json({
    list:profile
   })
}

const create =async (req, res) => {
    const {
        name,
        code,
        description,
    }= req.body;
    const param = [name, code, description];
    const sqlInsert = "INSERT INTO invoice_status (name, code, description) VALUES (?, ?, ?)";
    const data = await db.query(sqlInsert,param);
    res.json({
        message: "Insert Success!",
        list:data
    })

}

const update =async (req, res) => {
    const {
        id,
        name,
        code,
        description
    } = req.body;
    const param = [name, code, description,id];
    const sqlUpdate = "UPDATE invoice_status SET name = ? , code = ?, description = ? WHERE id =?";
    const data = await db.query(sqlUpdate, param);
    res.json({
        message:data.affectedRows !=0 ? "Update Success!!!": "Invoice-Status not found!!",
        data:data
    })
}

const remove =async (req, res) => {
   const {id} = req.params;
   const sqlDelete = "DELETE  FROM invoice_status WHERE id =?";
   const data = await db.query(sqlDelete,[id]);
   res.json({
      message:data.affectedRows !=0 ? "Delete Success!!!": "Invoice-Status not found!!",
   })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}