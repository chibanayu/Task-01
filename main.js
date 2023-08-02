const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "express_db",
});

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  const sql = "select * from personas";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
      personas: result
    });
  });
});
