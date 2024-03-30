const db = require('../util/db')

const getAll =async (req, res) => {
    const sqlget = "SELECT * FROM shift_details"
    const lists = await db.query(sqlget)
    res.json({
        lists:lists
    })
}

const getOne =async (req, res) => {
    const {id} = req.params
    const sqlOne = "SELECT * FROM shift_details WHERE id = ?"
    const list = await db.query(sqlOne, [id])
    res.json({
        list:list
    })
}

const create =async (req, res) => {
  const {
    shiftId,
    employeeId,
    openningBalance,
    isClose
  } = req.body;
  const param = [shiftId, employeeId, openningBalance, isClose];
  const sqlInsert = "INSERT INTO shift_details (shiftId, employeeId, openningBalance, isClose) VALUES (?, ?, ?, ?)"
  const data = await db.query(sqlInsert,param)
  res.json({
    message: "Insert Success",
    data:data
  })
}

const update =  async (req, res) => {
    const {
        shiftId,
        employeeId,
        openningBalance,
        isClose,
        id
    } = req.body;
    const param = [shiftId, employeeId, openningBalance, isClose,id]; 
    const sqlUpdate = "UPDATE shift_details SET shiftId =?, employeeId=?, openningBalance=?, isClose=? WHERE id=?";
    const data = await db.query(sqlUpdate, param)
    res.json({
        message: data.affectedRows !=0 ? "Update Successfully": "Shift_Details not found!!"
    })
}

const remove =async (req, res) => {
   const {id}  = req.params;
   const sqlDelete = "DELETE FROM shift_details WHERE id = ? ";
   const data = await db.query(sqlDelete, [id])
   res.json({
    message : data.affectedRows !=0 ? "Remove Successfully" : "shift_Details not found"
   })
}

module.exports = {
    getAll,
    getOne,
    create, 
    update,
    remove
}