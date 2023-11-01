import path from "path";
import multer from "multer";
import express from "express";
import homeController from "../controller/homeController";
var appRoot = require("app-root-path");
let router = express.Router();


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("??? CHÊCK", appRoot)
//     cb(null, appRoot + "/src/public/image/");
//   },
//    //TRanh trung ten file
//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|WEBP)$/)) {
//     req.fileValidationError = "Only image files are allowed!";
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: imageFilter });


const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage); 

  router.get("/login", homeController.getLogin); 
  // router.get("/login/users", homeController.getLoginUser);
  router.post("/login/user", homeController.postLogin);
  router.get("/loginADMIN", homeController.getLoginADMIN);

  router.get("/register", homeController.getRegister); 
  router.post("/register", homeController.postRegister);




/* Product */
  router.get("/login/admin/addBook", homeController.getAddBookAdmin);
  
  router.post("/login/admin/create-new-book", homeController.postAddBookAdmin);
  // router.post("/login/admin/create-new-book", upload.single('image'), homeController.postAddBookAdmin);
  
  router.get("/login/admin/allBook", homeController.getAllBookAdmin);
  
  router.get("/detail/book/:idBook", homeController.getItemBook);
  
  router.post("/login/admin/delete/:idBook", homeController.postDeleteBook);
  
  router.get("/login/admin/update/:idBook", homeController.getUpdateBook);
  router.post("/update-book", homeController.postUpdatedBook);



  /* Khách hàng */
  router.get("/login/admin/customer", homeController.getAllCostomer);
  // router.get("/login/admin/updateCos/:idUser", homeController.getItemCostomer);
  
  return app.use("/", router);
};

export default initWebRoute;
