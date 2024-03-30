const invoiceStatusController = require('../controller/invoiceStatusController')

const invoiceStatus = (app) => {
    app.get('/api/invoice-status', invoiceStatusController.getAll)
    app.get('/api/invoice-status/:id', invoiceStatusController.getOne)
    app.post('/api/invoice-status', invoiceStatusController.create)
    app.put('/api/invoice-status', invoiceStatusController.update)
    app.delete('/api/invoice-status/:id', invoiceStatusController.remove)
}

module.exports = invoiceStatus;