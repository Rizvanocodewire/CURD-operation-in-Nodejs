const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var mysql = require("mysql");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "data1",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/register.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/profile", function (req, res) {
  res.sendFile(__dirname + "/profile.html");
});

// registration page
app.post("/register", function (req, res) {
  const username = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.email, "dfsfsdfdsfdsfdsf");
  const sql = `INSERT INTO user1 (user_id,username,email,password) VALUES ('0','${username}','${email}','${password}')`;

  con.query(sql, function (err, data) {
    res.send("jcdjc");
    // res.sendFile(__dirname + "/login.html");
  });
});
// for login page

//
app.post("/login", function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const data = `SELECT * FROM user1 WHERE email='${email}' AND password='${password}'`;
  con.query(data, function (err, result) {
    if (result) {
      // console.log(result[0].username);
      res.render(__dirname + "/profile.html", { result: result });
    } else {
      res.send("please provide valid email and password");
    }
  });
});
// logout page

app.post("/logout", function (req, res) {
  res.render(__dirname + "/login.html");
  // const email = req.body.email;
  // const password = req.body.password;
  // const sql = `SELECT * FROM user1 WHERE email='${email}' AND password='${password}'`;
  // con.query(sql, function (err, result) {});
});
//  profile update
// app.post("/profile", function (req, res) {
//   const username = req.body.username;
//   console.log(username);
//   const email = req.body.email;
//   const password = req.body.password;
//   const sql = `UPDATE user1 SET username='${username}' WHERE email='${email}' AND password='${password}'`;
//   console.log(sql, "dsfdsfsdfdsfds");
//   con.query(sql, function (err, data) {
//     console.log({ data: data });
//     res.render(__dirname + "/updateform.html", "updated successfully");
//   });
// });
app.post("/profileupdate", function (req, res) {
  const username = req.body.username;
  console.log(username, "uuuuuuuuuuuuuuuuuu");
  const email = req.body.email;
  const password = req.body.password;
  const data = `UPDATE user1 SET username='${username}' WHERE email='${email}' AND password='${password}'`;
  con.query(data, function (err, result) {
    if (result) {
      // console.log(result[0].username);
      res.render(__dirname + "/updateform.html");
    } else {
      res.send("please provide valid email and password");
    }
  });
});

app.listen(3030);
