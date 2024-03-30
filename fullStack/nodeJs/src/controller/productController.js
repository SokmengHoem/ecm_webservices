const db = require('../util/db');
const { removeFile } = require('../util/helper');

const pageSize = 3;
const getAll =async (req, res) => {
   try{
    const {
        textSearch,
        page //from clien 
    } = req.query;
    var offset = ((page-1) * pageSize) //find offset
    var sqlGet = " SELECT " +
    " p.*," + 
    " c.name as category_Name" +
    " FROM product as p" +
    " INNER JOIN category AS c ON p.category_id = c.category_id" ;
   
    var sqlWhere = "";
    if(textSearch != null && textSearch != ""){
        sqlWhere = " WHERE p.name LIKE '%"+textSearch+"%' ";
       // param.push("%"+textSearch+"%")
        
    }
    var sqlOrderBy = " ORDER BY id DESC ";
   var limit = " LIMIT "+pageSize+" OFFSET "+ offset ; //0(index) is start record and 2 limit we want shoe
   
   var sql = sqlGet + sqlWhere + sqlOrderBy + limit;
   //console.log(sql);
  // console.log(sql);

   const lists = await db.query(sql)
   var total = 0;
   if(page == 1){
    var sqlCount = "SELECT COUNT (id) as Total FROM product"
    sql = sqlCount + sqlWhere
    var total = await db.query(sql)
   }
   res.json({
    lists:lists,
    total:total
   })
   }catch(err){
    res.status(500).send({
        message : err.message
    })
   }
}

const getProductAlert = async (req, res) => {
    try{
        const list = await db.query("SELECT * FROM product WHERE quantity <= quantity_alert_stock");
        res.json({
            list:list
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
           
            message : e.message
        })
    }
}

const getOne = async (req, res) => {
    const {id} = req.params;
   
    const sqlOne = "SELECT * FROM product WHERE id=?"
    const list = await db.query(sqlOne,[id])
    
        res.json({
            lists:list
        })
}

const create =async (req, res) => {
   try{
    const {
        category_id,
        name,
        description,
        price,
        quantity,
        image,
        is_active
       } = req.body;
    
       var filename = null;
       if(req.file){
        filename = req.file.filename
       }
       const param = [category_id, name, description, price, quantity, filename, is_active];
       const sqlInsert = "INSERT INTO product (category_id, name, description, price, quantity, image, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)";
       const data = await db.query(sqlInsert, param);
       res.json({
        message: "Insert Success!!!",
        data:data
       })
   }catch(error){
    res.status(500).send({
        message : error.message
    })
   }
}

const update =async (req, res) => {
    try{
        const {
            id,
            category_id,
            name,
            description,
            price,
            quantity,
            image,
            is_active
        }= req.body;
        var filename = null;
       if(req.file){
        filename = req.file.filename
       }

        const param = [category_id, name, description, price, quantity, filename, is_active, id];
        const sqlPut = "UPDATE product SET category_id=?, name=?, description=?, price=?, quantity=?, image=?, is_active=?  WHERE id=?";
        const data = await db.query(sqlPut,param);
        res.json({
            message: data.affectedRows !=0 ? "Update Successfully": "Product not found!!",
            data:data
        })
    }catch{
        res.sendStatus(500)
    }
}

const remove =async (req, res) => {
   try {
    const {id,image} = req.body;
    const sqlDelete = "DELETE FROM product WHERE id =?";

    const list = await db.query(sqlDelete,[id])
    if(rows.affectedRows != 0){
        removeFile(image)
    }
    res.json({
        message: list.affectedRows !=0 ? "Remove Successfully": "Product not found!!",
    })
   }catch{
    res.sendStatus(500)
   }
}

const getProduct = async (req, res) => {
     var sqlGet = " SELECT " +
    " p.*," + 
    " c.name as category_Name" +
    " FROM product as p" +
    " INNER JOIN category AS c ON p.category_id = c.category_id ORDER BY id DESC" ;
    const lists = await db.query(sqlGet);
    res.json({
        lists:lists
    })
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getProduct,
    getProductAlert
}