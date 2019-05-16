const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

//using cors
app.use(cors());
// set up BodyParser Middleware
app.use(bodyParser.json({ limit: "100mb" })); // limit post data: 50 MB
app.use(bodyParser.urlencoded({ extended: true }));
// routes
app.use("/", routes);
//Setting Server
app.listen(3000, () => console.log("Server is running at 3000"));
