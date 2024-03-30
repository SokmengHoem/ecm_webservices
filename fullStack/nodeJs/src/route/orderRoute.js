const orderController = require('../controller/orderController')

const order = (app) => {
    app.get('/api/order', orderController.getAll);
    app.get('/api/order/:id', orderController.getOne);
    app.get('/api/orderPos', orderController.getDataFromTable);
    app.post('/api/order', orderController.create)
    app.put('/api/order', orderController.update);
    app.delete('/api/order/:id', orderController.remove);
}

module.exports = order