const express = require("express")
const { createCategory , categoryList ,updateCategory , deletCategory , createService , serviceListByCateg ,  updateServById , delService} = require("../controllers/category")
const authenticateToken = require("../middleware/authenticateToken")
const authRoute = express.Router()    


authRoute.post("/category" , authenticateToken , createCategory)
authRoute.get("/categories" , authenticateToken , categoryList)
authRoute.put("/category/:categoryId" , authenticateToken , updateCategory)
authRoute.delete("/category/:categoryId" , authenticateToken , deletCategory)

//------------------- servies ----------------------
  authRoute.post("/category/:categoryId/service" , authenticateToken , createService)
  authRoute.get("/category/:categoryId/services" , authenticateToken , serviceListByCateg)
  authRoute.delete("/category/:categoryId/service/:serviceId" , authenticateToken , updateServById)
  authRoute.put("/category/:categoryId/service/:serviceId" , authenticateToken , delService)



module.exports = authRoute