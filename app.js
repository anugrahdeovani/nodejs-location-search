const http = require('http');
const express = require ('express');
const app = express();
const mysql = require('mysql');
const cors = require ('cors')
//Database Connection


var con = mysql.createConnection(
{
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Training-Amber' 
})

var db = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Basic' 
})

var execute = (db, sql, args) => {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (error, results, fields) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

//using cors
app.use(cors())

//Setting Server
app.listen(3000,()=>console.log('Server is running at 3000'));

//test server/test
app.get('/',(req,res)=>{res.send('NodeJS find location BackEnd by Deovani Anugrah')})

// When user access database Person
app.get('/location-bylonglat',(req,res)=> {
    const params = req;
    console.log(params);
    
    con.query("Select * FROM person", ( err, result) => {
        let data=[];
        result.forEach((item) => {
            // console.log(item)
            console.log(typeof(item.orangid))
            data.push(
                {
                    type:"orangs",
                    id:item.orang_id,
                    attributes:
                        {
                            orangname: item.orang_name
                        }
                }   
            )   
        })
        console.log(data);    
        res.json(data)
    })

    //for Frans
    let data = req.body.attributes
     ,  longitude = data.longitude
     ,  latitude = data.latitude

    let sql = `SELECT desa, kecamatan, kabupaten, provinsi, region, area, branch, subbranch, cluster
               FROM BTS_DESA WHERE langitude = ? AND latitude = ?`

    execute(db, sql, [longitude, latitude]).then(response => {
      let output = [];
      response.forEach((item) => {
        output.push({
          desa : item.desa,
          kecamatan : item.desa,
          kabupaten : item.desa,
          provinsi : item.desa,
          region : item.desa,
          area : item.desa,
          branch : item.desa,
          subbranch : item.desa,
          cluster : item.desa
        })
      })
      res.json(response);
    }).catch(reason => {
      res.json([{
        reason
      }])
    })
    
})