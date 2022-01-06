const mysql = require('mysql');
// const connection = require('mysql/lib/Connection');

//connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});


// show users
exports.show = (req, res) => {

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("MySql connected");

  connection.query('SELECT * FROM users WHERE status = "active" ', (err, databack) => {
    connection.release();

    if(!err) {
        res.render('home', {databack});
    } else {
        console.log(err);
    }
    console.log('this is the data from users table: \n', databack);
  });
});


};

// find user
exports.find = (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("MySql connected");

    let searchUser = req.body.search;
    connection.query(
      "SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchUser + "%", "%" + searchUser + "%"],
      (err, databack) => {
        connection.release();

        if (!err) {
          res.render("home", { databack });
        } else {
          console.log(err);
        }
        console.log("this is the data from users table: \n", databack);
      }
    );
  });
};

//add user 
// exports.adduserform = (req, res) => {
//   const {Fname, Lname, Email, Phone, Comment} = req.body;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("MySql connected");

//     connection.query("INSERT INTO users SET first_name = ?, Lname = ?", [Fname, Lname],
//       (err) => {
//         connection.release();

//         if (!err) {
//           res.render("adduser");
//         } else {
//           console.log(err);
//         }
//         console.log("this is the data from users table: \n", databack);
//       }
//     );
//   );
//     };
//   );
// };
//add user
exports.adduserform = (req, res) => {
  res.render("adduser");
}

exports.create = (req, res) => {
  const { Fname, Lname, Email, Phone, Comment } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("MySql connected");

    connection.query(
      "INSERT INTO users SET first_name = ?, last_name = ?, phone_number = ?, email = ?, comments = ?  ",
      [Fname, Lname, Email, Phone, Comment],
      (err) => {
        connection.release();

        if (!err) {
          res.render("adduser", {alert: 'User added successfully.'});
        } else {
          console.log(err);
        }
      }
    );
  });
};