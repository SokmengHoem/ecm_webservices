const invoiceController = require('../controller/invoiceController')

const invoice = (app) => {
    app.get("/api/invoice", invoiceController.getAll)
    app.get("/api/invoice/:id", invoiceController.getOne)
    app.post("/api/invoice", invoiceController.create)
    app.put("/api/invoice", invoiceController.update)
    app.delete("/api/invoice/:id", invoiceController.remove)
}

module.exports = invoice