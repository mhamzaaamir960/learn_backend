const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceRoll });
});

app.get("/instagram/:username", (req, res) => {
  const { username } = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  if (data) {
    res.render("instagram.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});

app.get("/hello", (req, res) => {
  res.send("hello world!");
});

app.listen(3000, () => {
  console.log("App is listening at port: 3000");
});
