const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
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

//入力フォームに飛ぶための記述
app.get("/create1", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/html/form.html"));
});

//選択した情報一覧に飛ぶための記述
app.get("/create2", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/html/selection.html"));
});

//更新フォームに飛ぶための記述
app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM personas WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", { user: result });
  });
});

//削除機能の記述
app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM personas WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.redirect("/");
  });
});

//ボタンをクリックしたら追加できるように

//選択ボタン
app.get("/selection/:id", (req, res) => {
  const sql = "SELECT FROM personas WHERE id = ?";
  // con.query(sql, [req.params.id], function (err, result, fields) {
  //   if (err) throw err;
  //   res.render("selection", { user: result });
  // });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
