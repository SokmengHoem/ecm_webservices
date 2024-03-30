const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const sqlGet =
      "SELECT " +
      " r.id," +
      " concat(c.firstname,'-',c.lastname) AS customer_name," +
      " pm.name AS payement_methode," +
      " os.name AS order_status," +
      " concat(e.firstname,'-',e.lastname) AS employee_name," +
      " r.note," +
      " r.total," +
      " r.create_at" +
      " FROM `order` r " +
      " INNER JOIN customer c ON (r.customer_id = c.customer_id) " +
      "  INNER JOIN payement_methode pm ON (r.payment_method_id = pm.id)" +
      "  INNER JOIN order_status os ON (r.order_status_id = os.id)" +
      " INNER JOIN employee e ON (r.user_id = e.employee_id) ";

    var sqlSum =
      " SELECT" +
      " COUNT(r.id) AS TotalRecord," +
      " SUM(r.total) AS TotalAmount" +
      " FROM `order` AS r";
    const lists = await db.query(sqlGet);
    const sumResult = await db.query(sqlSum);
    res.json({
      lists: lists,
      sumResult: sumResult[0],
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getDataFromTable = async (req, res) => {
  try {
    const customer = await db.query("SELECT * FROM `customer`");
    const payment_method = await db.query("SELECT * FROM payement_methode");
    const order_status = await db.query("SELECT * FROM order_status");
    res.json({
      customer: customer,
      payment_method: payment_method,
      order_status: order_status,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const sqlGetOne = "SELECT * FROM `order` WHERE id =?";
    const list = await db.query(sqlGetOne, [id]);
    res.json({
      list: list,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    db.beginTransaction();
    const {
      customer_id,
      user_id,
      order_status_id,
      payment_method_id,
      total,
      note,
      is_paid,
      array_product,
    } = req.body;
    //for the order
    const sqlCreateOrder =
      "INSERT INTO `order` (customer_id, user_id, order_status_id, payment_method_id, total, note, is_paid) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const paramOrder = [
      customer_id,
      user_id,
      order_status_id,
      payment_method_id,
      total,
      note,
      is_paid,
    ];
    const dataOrder = await db.query(sqlCreateOrder, paramOrder);
    //for order detail

    array_product.map(async (item, index) => {
      const sqlOrderDetail =
        "INSERT INTO order_details ( order_id, product_id, quantity, price, discount, discount_price, total) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const paramOrderDetail = [
        dataOrder.insertId,
        item.id,
        item.qty,
        item.price,
        0,
        0,
        item.qty * item.price,
      ];
      const dataOrderDetail = await db.query(sqlOrderDetail, paramOrderDetail);

      //for reStock | update stock in table product
      const sqlReStock = "UPDATE product SET quantity=(quantity-?) WHERE id=?";
      const paramReStock = [item.qty, item.id];
      const dataReStock = await db.query(sqlReStock, paramReStock);
    });
    db.commit();
    res.json({
      message: "Create Successfully",
      data: dataOrder,
    });
  } catch (e) {
    console.log(e);
    db.rollback();
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  res.send("getupdate");
};

const remove = async (req, res) => {
  res.send("getdelete");
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getDataFromTable,
};
