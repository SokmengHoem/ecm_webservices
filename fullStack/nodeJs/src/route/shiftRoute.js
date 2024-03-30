const shiftController = require('../controller/shiftController')

const shift = (app) => {
    app.get('/api/shift', shiftController.getAll)
    app.get('/api/shift/:id', shiftController.getOne)
    app.post('/api/shift', shiftController.create)
    app.put('/api/shift', shiftController.update)
    app.delete('/api/shift/:id', shiftController.remove)
}

module.exports = shift