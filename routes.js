const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const qs = require("querystring");

//Database Connection
var db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "Monsterofthemunich6997.",
  database: "location-search"
});

var execute = (db, sql, args) => {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

//test server/test
router.get("/", (req, res) => {
  res.send("NodeJS find location BackEnd by Deovani Anugrah");
});

// When user access database Person
router.get("/search-bylonglat", (req, res) => {
  let data = req.query;
  let longitude = data.longitude;
  let latitude = data.latitude;

  let sql = `SELECT desa, kecamatan, kabupaten, provinsi, region, area, branch, subbranch, cluster
            FROM locationsearch WHERE longitude = ? AND latitude = ?`;

  execute(db, sql, [longitude, latitude])
    .then(response => {
      res.json(response[0]);
    })
    .catch(reason => {
      res.status(500).json(reason);
    });
});

module.exports = router;
