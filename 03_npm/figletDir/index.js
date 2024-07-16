

var figlet = require("figlet");

figlet("Muhammad  Hamza  Aamir", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

