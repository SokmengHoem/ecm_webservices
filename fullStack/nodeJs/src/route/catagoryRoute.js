
const categoryController = require("../controller/categoryController")

const category = (app) => {
    app.get("/api/category", categoryController.getAll);
    app.get("/api/category/:id", categoryController.getOne);
    app.post("/api/category", categoryController.create);
    app.put("/api/category", categoryController.update);
    app.delete("/api/category/:id", categoryController.remove);
}

module.exports= category;