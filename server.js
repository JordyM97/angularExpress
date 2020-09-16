const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require('https');

const app = express();
const db = require("./models");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
var options = {
  "method": "GET",
  "hostname": "losefat-f27a.restdb.io",
  "path": "/rest/paginas",
  "port": 4000,
  "headers": {
    "Content-Type": "application/json",
    "x-apikey": "5f5fba5cc5e01c1e033b9013",
    "Cache-Control": "no-cache"
  }
  };

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fatlose application." });
});
require("./routes/usuario")(app);
require("./routes/producto")(app);
require("./routes/pedido")(app);
require("./routes/contacto")(app);
require("./routes/visita")(app);



//comando para dropear tablas
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//}); 




// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});