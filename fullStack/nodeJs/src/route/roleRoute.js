const roleController = require('../controller/roleController')

const role = (app) => {
    app.get("/api/role", roleController.getAll)
    app.get("/api/role/:id", roleController.getOne)
    app.post("/api/role", roleController.create)
    app.put("/api/role", roleController.update)
    app.delete("/api/role/:id", roleController.remove)
}

module.exports= role;