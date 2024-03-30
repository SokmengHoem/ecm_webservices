const shiftDetailController = require('../controller/shiftDetailController')

const shiftDetail = (app) => {
    app.get('/api/shiftDetail', shiftDetailController.getAll)
    app.get('/api/shiftDetail/:id', shiftDetailController.getOne)
    app.post('/api/shiftDetail', shiftDetailController.create)
    app.put('/api/shiftDetail', shiftDetailController.update)
    app.delete('/api/shiftDetail/:id', shiftDetailController.remove)
}

module.exports = shiftDetail