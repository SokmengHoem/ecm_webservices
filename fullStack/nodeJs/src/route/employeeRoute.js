const employeeController = require("../controller/employeeController")
const { upload } = require("../util/helper")


const employee = (app) => {
   app.get("/api/employee", employeeController.getAll)
   app.get("/api/employee/:id", employeeController.getOne)
   app.post("/api/employee",upload.single("image_emp"), employeeController.create)
   app.post("/api/employee/set-password", employeeController.setPassword)
   app.post("/api/employee/login", employeeController.login)
   app.put("/api/employee",upload.single("image_emp"), employeeController.update)
   app.delete("/api/employee", employeeController.remove)
}

module.exports = employee