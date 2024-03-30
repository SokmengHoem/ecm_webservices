
const customerController = require('../controller/customerController');

const customer = (app) => {
    app.get("/api/customer", customerController.getAll)
    app.get("/api/customer/:id", customerController.getOne)
    app.post("/api/customer", customerController.create)
    app.put("/api/customer", customerController.update)
    app.delete("/api/customer/:id", customerController.remove)
}

module.exports = customer;