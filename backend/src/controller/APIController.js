import pool from "../configs/connectDB";

let getAllBook = async (req, res) => {
  try {
    const [books, fields] = await pool.execute("SELECT books.*, category.nameCategory " +
      "FROM books " +
      "INNER JOIN Category ON books.idCategory = Category.idCategory " +
      "WHERE books.trangthai = 1");
    
    return res.status(200).json({
      dataBook: books,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

let getCategory = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM CATEGORY WHERE ttCategory = 1");

  return res.status(200).json({
    dataCategory: rows,
  });
};

let SearchBook = async (req, res) => {
  let {input} = req.body;
  if(input !== '') {
    if (!isNaN(parseInt(input))) {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM BOOKS, CATEGORY where (CATEGORY.idCategory LIKE ?) and BOOKS.trangthai=1 and BOOKS.idCategory=CATEGORY.idCategory", ['%' + input + '%']
      );
  
      console.log(rows)
    
      return res.status(200).json({
        dataBook: rows,
      });
    } else {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM BOOKS, CATEGORY where (BOOKS.bookTitle LIKE ? or BOOKS.author LIKE ? or CATEGORY.nameCategory LIKE ?) and BOOKS.trangthai=1 and BOOKS.idCategory=CATEGORY.idCategory", ['%' + input + '%', '%' + input + '%', '%' + input + '%']
      );
  
      console.log(rows)
    
      return res.status(200).json({
        dataBook: rows,
      });
    }
  } else {
    console.log("Không tìm thấy kết quả!")
  }
};

let detailBook = async (req, res) => {
  const idBook = req.params.idBook;

  try {
    let [rows, fields] = await pool.execute(
      "select books.*, category.nameCategory from books, category where books.idBook = ? and category.idCategory = books.idCategory",
      [idBook]
    );

    return res.status(200).json({
      dataBook: rows[0]
    });
  } catch (error) {
    return res.status(500).json({ error: "Không hiển thị sách được!" });
  }
};

let deleteBook = async (req, res) => {
  let idBook = req.body.idBook;
  await pool.execute("update books set trangthai= 0 where idBook = ?", [idBook]);
  // const [rows, fields] = await pool.execute("SELECT *, DATE_FORMAT(dateofbirth, '%d/%m/%Y') as formatted_dateofbirth FROM customer where trangthai = 1");

  return res.status(200).json({
    message: "Xóa thành công!",
  });
};

/* Admin */
let loginAdmin = async (req, res) => {
  let { email, password } = req.body;
  const [rows, fields] = await pool.execute(
    "select * from admin where idAdmin=0"
  );
  const emailValue = rows[0].email;
  const passAdminValue = rows[0].password;

  if (emailValue == email && password == passAdminValue) {
    return res.status(200).json({
      dataAdmin: rows[0],
    });
  } else {
    return res.status(500).json({ error: "\n Đăng nhập không thành công!" });
  }
};

let getInfoAdmin = async (req, res) => {
  const [rowsAdmin, fieldsAdmin] = await pool.execute(
    "select * from admin where idAdmin=0"
  );

  return res.status(200).json({
    dataAdmin: rowsAdmin[0],
  });
};

let updateAdmin = async (req, res) => {
  let { username, email, idAdmin } = req.body;

  console.log( username, email, idAdmin )

  try {
    await pool.execute(
      "update admin set username = ?, email = ? where idAdmin = ?",
      [username, email, idAdmin]
    );

    return res.status(200).json({
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.log("Không cập nhật được!", error);
    return res.status(500).json({ error: "Không hiển thị được!" });
  }
};

let updatePassAdmin = async (req, res) => {
  let { currentPassword, newPassword } = req.body;

  const [rows, fields] = await pool.execute(
    "select password from admin where idAdmin=0"
  );
  const passAdminValue = rows[0].password;

  if (passAdminValue == currentPassword) {
    await pool.execute("update admin set password = ? where idAdmin=0", [
      newPassword,
    ]);
    // let [admin, fields] = await pool.execute("select * from admin");
    return res.status(200).json({ error: "\n Cập nhật khẩu hiện thành công!" });
  } else {
    return res.status(500).json({ error: "\n Mật khẩu hiện tại không đúng!" });
  }
};

/* Category */
let detailCategory = async (req, res) => {
  const idCategory = req.params.idCategory;
  try {
    let [rows, fields] = await pool.execute(
      "select * from category where idCategory = ?",
      [idCategory]
    );

    return res.status(200).json({
      dataCategory: rows[0]
    });
  } catch (error) {
    return res.status(500).json({ error: "Không hiển thị thể loại được!" });
  }
};

let updateCategory = async (req, res) => {
  let { nameCategory, idCategory } = req.body;

  try {
    await pool.execute(
      "update Category set nameCategory= ? where idCategory= ?",
      [nameCategory, idCategory]
    );

    return res.status(200).json({
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.log("Không cập nhật được!", error);
    return res.status(500).json({ error: "Không hiển thị được!" });
  }
};

let createCategory = async (req, res) => {
  try {
    const { nameCategory } = req.body;

    // Check if nameCategory is empty or undefined
    if (!nameCategory || nameCategory.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    await pool.execute("INSERT INTO category (nameCategory) VALUES (?)", [nameCategory]);

    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error when creating category:", error);
    res.status(500).json({ message: "Error creating category" });
  }
};

let deleteCategory = async (req, res) => {
  let idCategory = req.body.idCategory;
  await pool.execute("update Category set ttCategory= 0 where idCategory = ?", [idCategory]);
  
  return res.status(200).json({
    message: "Xóa thành công!",
  });
};

let SearchCategory = async (req, res) => {
  let {input} = req.body;
  if(input !== '') {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM CATEGORY where CATEGORY.ttcategory =1 and CATEGORY.nameCategory like ?", ['%' + input + '%']
      );
  
      console.log(rows)
    
      return res.status(200).json({
        dataCategory: rows,
      });
  } else {
    console.log("Không tìm thấy kết quả!")
  }
};

/* Khách hàng */
let loginCustomer = async (req, res) => {
  try {
let { email, password } = req.body;

  const [rows, fields] = await pool.execute(
    "select email, password from users where email= ? and password= ? and trangthai=1",
    [email, password]
  );

      if (rows && rows.length > 0) {
        const emailValue = rows[0].email;
        const passValue = rows[0].password;
  
        if (emailValue == email && password == passValue) {
          console.log("Đăng nhập thành công!");
          return res.status(200).json({
            dataUser: rows[0],
          });
        } else {
          console.log("Đăng nhập không thành công 1!");
          return res
            .status(400)
            .json({ error: "\n Đăng nhập không thành công 1!" });
        }
      } else {
        console.log("Đăng nhập không thành công 2!");
        return res
          .status(500)
          .json({ error: "\n Đăng nhập không thành công 2!" });
      }


  } catch (error) {
        console.log("Đăng nhập không thành công 3!");
    return res.status(500).json({ error: "\n Đăng nhập không thành công 3!" });
  }
};

// let registerCustomer = async (req, res) => {
//   let { username, password, address, email, phonenumber, dateofbirth } =
//     req.body;

//   try {
//     const [rows, fields] = await pool.execute(
//       "SELECT * FROM customer WHERE email = ?",
//       [email]
//     );

//     if (rows.length > 0) {
//       // Nếu đã tồn tại email trong CSDL, trả về thông báo lỗi
//       return res.status(400).json({
//         message: "Email đã tồn tại trong hệ thống.",
//       });
//     }

//     await pool.execute(
//       "insert into customer(username, password, address, email, phonenumber, dateofbirth) values (?, ?, ?, ?, ?, ?)",
//       [username, password, address, email, phonenumber, dateofbirth]
//     );

//     return res.status(200).json({
//       message: "Đăng ký thành công!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Đăng ký không thành công!",
//     });
//   }
// };


let getCustomer = async (req, res) => {
  const [rows, fieldsAdmin] = await pool.execute(
    "select * from users where ttcustomer = 1"
  );

  return res.status(200).json({
    dataUser: rows,
  });
};

let createCustomer = async (req, res) => {
  try {
    const {username, address, email, phoneNumber } = req.body;

    await pool.execute("INSERT INTO USERS (username, address, email, phoneNumber) VALUES (?, ?, ?, ?)", [username, address, email, phoneNumber]);

    res.status(200).json({ message: "Customer created successfully" });
  } catch (error) {
    console.error("Error when creating Customer:", error);
    res.status(500).json({ message: "Error creating Customer" });
  }
};

let detailCustomer = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    let [rows, fields] = await pool.execute(
      "select * from users where idUser = ?",
      [idUser]
    );

    return res.status(200).json({
      dataUser: rows[0]
    });
  } catch (error) {
    return res.status(500).json({ error: "Không hiển thị khách hàng được!" });
  }
};

let updateCustomer = async (req, res) => {
  let { username, address, email, phoneNumber, idUser } = req.body;
console.log(username, address, email, phoneNumber, idUser)
  try {
    await pool.execute(
      "update users set username=?, address=?, email=?, phoneNumber=? where idUser= ?",
      [username, address, email, phoneNumber, idUser ]
    );

    return res.status(200).json({
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.log("Không cập nhật được!", error);
    return res.status(500).json({ error: "Không hiển thị được!" });
  }
};

let deleteCustomer = async (req, res) => {
  let idUser = req.body.idUser;
  await pool.execute("update users set ttCustomer= 0 where idUser = ?", [idUser]);
  
  return res.status(200).json({
    message: "Xóa thành công!",
  });
};

let SearchCustomer = async (req, res) => {
  let {input} = req.body;
  console.log(input)
  if(input !== '') {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM USERs where USERs.ttcustomer =1 and (USERs.username like ? or USERs.email like ?)", [('%' + input + '%'), ('%' + input + '%')]
      );
  
      console.log(rows)
    
      return res.status(200).json({
        dataUser: rows,
      });
  } else {
    console.log("Không tìm thấy kết quả!")
  }
};

// let updatePasswordCustomer = async (req, res) => {
//   let { currentPassword, newPassword, email} = req.body;
//   const [rows, fields] = await pool.execute(
//     "select password from customer where email= ?", [email]
//   );
//   const passValue = rows[0].password;

//   if (passValue == currentPassword) {
//     await pool.execute("update customer set password = ? where email=?", [
//       newPassword, email
//     ]);
  
//     return res.status(200).json({
//       message: "Cập nhật mật khẩu thành công!"
//     });
//   } else {

//     console.log("Cập nhật mật khẩu thành công!")
//     return res.status(500).json({ error: "\n Mật khẩu hiện tại không đúng!" });
//   }
// };

/* Đơn hàng */
let getOrther = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "select orderbook.idDH, DATE_FORMAT(orderbook.ngayGiao, '%d/%m/%Y') as ngayGiao, DATE_FORMAT(orderbook.ngayDat, '%d/%m/%Y') as ngayDat, orderbook.soluongDH, ttdonhang.nametrangthai, books.bookTitle from orderbook, ttdonhang, books where orderbook.idTrangthai = ttdonhang.idTrangthai and books.idBook = orderbook.idBook and orderbook.ttOrder = 1"
  );

  return res.status(200).json({
    dataOrther: rows,
  });
};

let createOrder = async (req, res) => {
  const {bookTitle, soluongDH, ngayDat, ngayGiao} = req.body;

  try {
    

    // Tìm kiếm sách
    const [book] = await pool.execute("SELECT * FROM BOOKS WHERE bookTitle = ?", [bookTitle]);

    if (!book) {
      return res.status(404).json({message: "Không tìm thấy sách"}); 
    }

    if(soluongDH > book[0].quantity || ngayDat > ngayGiao) {
      return res.status(404).json({message: "Không tìm thấy sách"}); 
    }

    const idBook = book[0].idBook;
    console.log(idBook)

    await pool.execute(
      "INSERT INTO ORDERBOOK (idBook, soluongDH, ngayDat, ngayGiao) VALUES (?, ?, ?, ?)",
      [idBook, soluongDH, ngayDat, ngayGiao]  
    );

    await pool.execute(
      "update books set quantity = ? where idBook = ?",
      [book[0].quantity - soluongDH, idBook]
    );

    // Trả về thành công
    return res.status(200).json({
      dataBook: book[0],
    });
  } catch (error) {
    // Báo lỗi nội bộ
    res.status(500).json({message: "Lỗi hệ thống"});
  }

};

let detailOrder = async (req, res) => {
  const idDH = req.params.idDH;
  console.log(idDH)
  try {

    let [rows, fields] = await pool.execute(
      "select orderbook.idDH, DATE_FORMAT(orderbook.ngayGiao, '%d/%m/%Y') as ngayGiao, DATE_FORMAT(orderbook.ngayDat, '%d/%m/%Y') as ngayDat, orderbook.soluongDH, users.*, ttdonhang.nametrangthai, books.* from orderbook, users, ttdonhang, books, detaildh where users.idUser = detaildh.idUser and orderbook.idTrangthai = ttdonhang.idTrangthai and books.idBook = orderbook.idBook and orderbook.idDH = detaildh.idDH and orderbook.idDH = ?",
      [idDH]
    );

    console.log("Update: ", rows[0])

    return res.status(200).json({
      dataOrder: rows[0]
    });
  } catch (error) {
    return res.status(500).json({ error: "Không hiển thị khách hàng được!" });
  }
};

let CustomerOrder = async (req, res) => {
  const idDH = req.params.idDH;
  console.log(idDH)
  try {
    let [rows, fields] = await pool.execute(
      "select orderbook.idDH, DATE_FORMAT(orderbook.ngayGiao, '%d/%m/%Y') as ngayGiao, DATE_FORMAT(orderbook.ngayDat, '%d/%m/%Y') as ngayDat, orderbook.soluongDH, users.*, ttdonhang.nametrangthai, books.* from orderbook, users, ttdonhang, books where users.idUser = orderbook.idUser and orderbook.idTrangthai = ttdonhang.idTrangthai and books.idBook = orderbook.idBook and orderbook.idDH = ?",
      [idDH]
    );

    console.log("Update: ", rows[0])

    return res.status(200).json({
      dataOrder: rows[0]
    });
  } catch (error) {
    return res.status(500).json({ error: "Không hiển thị khách hàng được!" });
  }
};

let deleteOrder = async (req, res) => {
  let idDH = req.body.idDH;
  await pool.execute("update orderbook set ttOrder= 0 where idDH = ?", [idDH]);
  
  return res.status(200).json({
    message: "Xóa thành công!",
  });
};

let trangthai = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM ttdonhang");

  return res.status(200).json({
    dataTrangthai: rows,
  });
};

let updateTT = async (req, res) => {
  let { idDH, idTrangthai } = req.body;
  console.log(idDH)
  console.log(idTrangthai)

  
  try {
    await pool.execute(
      "update orderbook set idTrangthai=? where idDH=?",
      [idTrangthai, idDH]
    );

    return res.status(200).json({
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.log("Không cập nhật được!", error);
    return res.status(500).json({ error: "Không hiển thị được!" });
  }
};

let searchOrder = async (req, res) => {
  let {input} = req.body;
  if(input !== '') {
      const [rows, fields] = await pool.execute(
        "SELECT orderbook.idDH, DATE_FORMAT(orderbook.ngayGiao, '%d/%m/%Y') as ngayGiao, DATE_FORMAT(orderbook.ngayDat, '%d/%m/%Y') as ngayDat, orderbook.soluongDH, books.bookTitle,  ttdonhang.nametrangthai, users.username FROM orderbook, books, ttdonhang, detaildh, users where orderbook.ttOrder = 1 and orderbook.idBook = books.idBook and orderbook.idTrangthai = ttdonhang.idTrangthai and orderbook.idDH = detaildh.idDH and detaildh.idUser = users.idUser and (books.bookTitle like ? or users.username like ?)", ['%' + input + '%', '%' + input + '%']
      );
  
      console.log(rows)
    
      return res.status(200).json({
        dataOrder: rows,
      });
  } else {
    console.log("Không tìm thấy kết quả!")
  }
};

module.exports = {
  loginAdmin, 
  getInfoAdmin,
  updateAdmin,
  updatePassAdmin,

  createCategory,
  detailCategory,
  updateCategory,
  deleteCategory,
  SearchCategory,

  getCustomer,
  createCustomer,
  detailCustomer,
  updateCustomer,
  deleteCustomer,

  loginCustomer,
  getAllBook,
  SearchBook,
  getCategory,
  detailBook,
  deleteBook,
  SearchCustomer,

  trangthai,
  updateTT,

  getOrther,
  detailOrder,
  createOrder,
  CustomerOrder,
  deleteOrder,
  searchOrder,
};
