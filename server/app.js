const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const sql = require('mysql')
const morgan = require('morgan');
const cors = require('cors')

app.use(cors())

global.db_config={
    host: "127.0.0.1",
   port: 8889,
   user: "root",
   password: "root",
   database: "myDBServer",
}

global.pool = sql.createPool(db_config);

//Check  Connection  with  Database
pool.getConnection(function(err, connection) {
    if(err){
        console.log('Error Connection With Database!!!');
    }
    console.log('Successfully Connected to Database')
})

// Simple query data from database
// pool.query(`SELECT * FROM tbUser WHERE 1`, function(err, result, field){
//         if(err)
//             console.log('Error Connection With Database!!!')
//         console.log(result)
//     });

//testing payway app
const login = require('./api/SNS_Routes/Users/login')
const register = require('./api/SNS_Routes/Users/register')

app.use(bodyParser.json({limit:  "50mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Credentials", "true");
    req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    req.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
   //  console.log(ipInfo);
    next();
});


app.use('/myServer/login', login);
app.use('/myServer/register', register);


global.generateAlias = function (item) {
    var lower = item.toLowerCase();
    var alias = lower.replace(/ /g, "-");
    alias = alias.replace(/&/g, "-");
    alias = alias.replace(/\//g, "-");
    alias = alias.replace(/\\/g, "-");
    alias = alias.replace(/----/g, "-");
    alias = alias.replace(/---/g, "-");
    alias = alias.replace(/--/g, "-");
    return alias;
  };
 
 module.exports = app;
 