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