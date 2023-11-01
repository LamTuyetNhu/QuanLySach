import pool from "../configs/connectDB";
const bcrypt = require("bcrypt")
const session = require("express-session")
const bodyParser = require('body-parser');

/* Home */
let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM BOOKS");
  return res.render("unlogin.ejs", { dataBook: rows });
};

let getRegister = async (req, res) => {
  return res.render("register.ejs");
}

let postRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let username = req.body.username
    let email = req.body.email
    let password = hashedPassword
    let address = req.body.address
    let phoneNumber = req.body.phoneNumber

    const [users] = await pool.execute("INSERT INTO USERS(username, email, password, address, phoneNumber) VALUES (?, ?, ?, ?, ?)", [username, email, password, address, phoneNumber])

    // console.log(users)
    res.redirect('/login')
  } catch (e) {
    console.log(e);
    res.redirect('/register')
  }
}

let getLogin = async (req, res) => {
  return res.render("login.ejs");
}

let postLogin = async (req, res, next) => {
  var email = req.body.email
  var password = req.body.password

  if(email && password) {
    let query = `SELECT * FROM USERS WHERE EMAIL = "${email}"`

    pool.query(query, function(error, data) {
      if (data.length > 0) {
        for (let i=0; i < data.length; i++) {
          if(data[i].password == password) {
            // req.sesion.idUser = data[i].idUser
            res.render("onlogin.ejs")
          } else {
            res.send("Mật khẩu không đúng!")
          }
        }
      } else {
        res.send("Email không tồn tại!")
      }
      res.end()
    })
  } else {
    res.send("Vui lòng nhập email và mật khấu!")
    res.end()
  }
}







/* ADMIN */

let getLoginADMIN = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM BOOKS");
  return res.render("onlogin.ejs", { dataBook: rows });
};

/* Details: 1 cuốn sách để xem và đặt*/
let getItemBook = async (req, res) => {
  let idBook = req.params.idBook;
  const [book] = await pool.execute("SELECT * FROM BOOKS WHERE idBook = ?", [
    idBook,
  ]);
  return res.render("detailsBook.ejs", { dataBook: book[0] });
};

/* Xem tất cả sách hiện của admin*/
let getAllBookAdmin = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM BOOKS");
  return res.render("allBook.ejs", { dataBook: rows });
};

/* Thêm 1 sách mới vào cơ sở dl */
let getAddBookAdmin = async (req, res) => {
  return res.render("addBook.ejs");
}

// const upload = multer().single('image');

let postAddBookAdmin = async (req, res) => {
//   upload(req, res, function(err) {
//     // req.file contains information of uploaded file
//     // req.body contains information of text fields, if there were any

//     if (req.fileValidationError) {
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.file) {
//         return res.send('Please select an image to upload');
//     }
//     else if (err instanceof multer.MulterError) {
//         return res.send(err);
//     }
//     else if (err) {
//         return res.send(err);
//     }
// // 
//     // Display uploaded image for user validation
//     res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//   });

  let {bookTitle, image, price, quantity, description, author, category} = req.body;
  await pool.execute("INSERT INTO BOOKS(bookTitle, image, price, quantity, description, author, category) VALUES (?, ?, ?, ?, ?, ?, ?)", [bookTitle, image, price, quantity, description, author, category])
  // return res.render("allBook.ejs");
  // await pool.execute("INSERT INTO BOOKS(bookTitle, price, quantity, description, author, category) VALUES (?, ?, ?, ?, ?, ?)", [bookTitle, price, quantity, description, author, category])
  return res.redirect("/loginADMIN")
}

/* Update */
let getUpdateBook = async (req, res) => {
  let idBook = req.params.idBook;
  const [book] = await pool.execute("SELECT * FROM BOOKS WHERE idBook = ?", [
    idBook,
  ]);
  return res.render("update.ejs", { dataBook: book[0] });
};

let postUpdatedBook = async (req, res) => {

  let {bookTitle, image, price, quantity, description, author, category, idBook } =
    req.body;
  await pool.execute(
    "UPDATE BOOKS SET bookTitle=?, image=?, price=?, quantity=?, description=?, author=?, category=? WHERE idBook=?",
    [bookTitle, image, price, quantity, description, author, category, idBook]
  );


  return res.redirect("/login/admin/allBook");
};

/* Delete */
let postDeleteBook = async (req, res) => {
  let idBook = req.params.idBook;
  const [book] = await pool.execute("DELETE FROM BOOKS WHERE idBook = ?", [
    idBook,
  ]);
  return res.redirect("/login/admin/allBook")
}

/* Khách hàng */
let getAllCostomer = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT username, email, address, phoneNumber FROM users")
  return res.render("allCostomer.ejs", {userData: rows});
}  

// let getItemCostomer = async (req, res) => {
//   let idUser = req.params.idUser;
//   const [user] = await pool.execute("SELECT username, email, address, phoneNumber FROM users WHERE idUser = ?", [
//     idUser,
//   ]);
//   return res.render("updateCos.ejs", { userData: user[0] });
// };

module.exports = {
  getHomepage,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLoginADMIN,
  // getLoginUser,
  // postLoginUser,
  getItemBook,
  getAddBookAdmin,
  postAddBookAdmin,
  getAllBookAdmin,
  postDeleteBook,
  getUpdateBook,
  postUpdatedBook,
  getAllCostomer,
  // getItemCostomer
};
