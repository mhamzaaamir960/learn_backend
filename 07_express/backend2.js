import express from "express";
const app = express();

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`App is listening on port ${port}`);
});

app.get("/", (req, res) => {
  // res.send("Hello World");
  res.send(
    `<a href='/devices'>Devices <br/></a><a href='/?name=Hamza+Aamir'>Name</a>`
  );
  console.log(req.query.name);
});

app.get("/devices", (req, res) => {
  res.send(
    `<a href='/'>Home</a><h1>Communication Devices: </h1><ol><li>Hub</li><li>Switch</li><li>Router</li><li>Gateway</li></ol> `
  );
});
