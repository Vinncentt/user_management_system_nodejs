const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
// const connection = require("mysql/lib/Connection");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing Midlware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

// Templaiting Engine (changing handlease extention)
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

//connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

// connect with db
pool.getConnection((err) => {
  if(err) throw err;
  console.log('MySql connected');
   app.listen(port, () => {
     console.log(`Listening to the server on http://localhost:${port}`); //template literals
   });
});

const routes = require('./server/routes/users');
app.use('/', routes);




