const orderStatusController = require('../controller/orderStatusController');

const orderStatus = (app) => {
    app.get("/api/orderStatus", orderStatusController.getAll)
    app.get("/api/orderStatus/:id", orderStatusController.getOne)
    app.post("/api/orderStatus", orderStatusController.create)
    app.put("/api/orderStatus", orderStatusController.update)
    app.delete("/api/orderStatus/:id", orderStatusController.remove)
}

module.exports = orderStatus;