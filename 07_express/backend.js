// const express = require("express");
// const app = express();

// const port = 3000;

// app.listen(port, () => {
//   console.log("app is listening on port ", port);
// });

// app.use((req, res) => {
//   console.log("request recieved");
//   let code = "<h1>Fruits</h1> <ul><li>apple</li><li>orange</li></ul>";
//   res.send(code);
// });

// app.get("/", (req, res) => {
//   res.send("Root path");
// });

// app.get("/about", (req, res) => {
//   res.send("About path");
// });

// app.get("/contact", (req, res) => {
//   res.send("Contact path");
// });

// app.get("/blogs", (req, res) => {
//   res.send("Blogs path");
// });

// app.get("*", (req, res) => {
//   res.send("This path donot exist!");
// });

// app.post("/todo", (req, res) => {
//   res.send("you todo is posted to server!");
// });

// app.get("/:username", (req, res) => {
//   let { username } = req.params;
//   let name = `<h3>${username}</h3>`;
//   res.send(name);
// });

// app.get("/:username/:id", (req, res) => {
//   let { username, id } = req.params;
//   let ress = `<h3>welcome ${username}! to this id => ${id}</h3>`;
//   res.send(ress);
// });

// app.get("/search", (req, res) => {
//   let { q , name} = req.query;
//   if (!q) res.send("nothing searched");
//   console.log(q);
//   res.send(`Query for ${q} to ${name}`);
// });
