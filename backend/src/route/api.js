import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/", APIController.getAllBook)
  router.post("/searchBook", APIController.SearchBook)
  router.get("/details/:idBook", APIController.detailBook)
  router.post("/deleteBook", APIController.deleteBook)

  router.get("/category", APIController.getCategory)
  router.get("/detailCate/:idCategory", APIController.detailCategory)
  router.post("/updateCategory", APIController.updateCategory)
  router.post("/deleteCategory", APIController.deleteCategory)
  router.post("/addCategory", APIController.createCategory)
  router.post("/searchCategory", APIController.SearchCategory)

  router.post("/loginAdmin", APIController.loginAdmin)
  router.get("/infoAdmin", APIController.getInfoAdmin)
  router.post("/updateAdmin", APIController.updateAdmin)
  router.post("/updatePassAdmin", APIController.updatePassAdmin)
  
  router.post("/loginCustomer", APIController.loginCustomer)
  router.get("/customer", APIController.getCustomer)
  router.get("/detailCus/:idUser", APIController.detailCustomer)
  router.post("/updateCustomer", APIController.updateCustomer)
  router.post("/deleteCustomer", APIController.deleteCustomer)
  router.post("/createCustomer", APIController.createCustomer)
  router.post("/searchCustomer", APIController.SearchCustomer)

  router.get("/trangthai", APIController.trangthai)
  router.post("/updateTT", APIController.updateTT)

  router.get("/getOrther", APIController.getOrther)
  router.get("/detailOrder/:idDH", APIController.detailOrder)
  router.post("/createOrder", APIController.createOrder)
  router.get("/CustomerOrder/:idDH", APIController.CustomerOrder)
  router.post("/deleteOrder", APIController.deleteOrder)
  router.post("/searchOrder", APIController.searchOrder)


  return app.use("/api", router);
};

export default initAPIRoute;
