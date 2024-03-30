
const paymentController = require('../controller/paymentController');
const payment = (app) => {
    app.get("/api/payment_method", paymentController.getAll);
    app.get("/api/payment_method/:id", paymentController.getOne);
    app.post("/api/payment_method", paymentController.create);
    app.put("/api/payment_method", paymentController.update);
    app.delete("/api/payment_method/:id", paymentController.remove);
}

module.exports = payment;