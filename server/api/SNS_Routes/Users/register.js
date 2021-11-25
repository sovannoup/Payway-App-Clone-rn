const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');


router.post('/',(req, res, next)=>{
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `INSERT INTO tbUser(username,email,password) VALUES (?,?,?)`;
    var dataSql = [username, email, password]
    console.log(dataSql)

    pool.getConnection(function(err, connection){
        if(err){
            console.log('Cannot Connect to Server')
            res.status(400).json({
                err: err,
            })
        }else{
            connection.query(sql,dataSql, function (error, results) {
                connection.release();
                if(error){
                    if(error.errno===1062){
                        res.status(400).json({
                            error: "duplicate",
                            message:"duplicate"
                        });
                    }else{
                        writeError.writeError("APP Signup_2:"+error)
                        res.status(400).json({
                            error: error,
                        });
                    }
                    }
                else{
                    if(results.insertId>0){
                        res.status(200).json({
                            message:'success',
                            results:[{"username":username,"email":email,"password":password}]
                        });
                        }
                    else{
                        res.status(400).json({
                            message:'error_insert_user ',
                        });
                    }
                }
                });
        }
    })
})

router.get('/', (req, res,next)=>{
    console.log('kkkk')
    return  'Hiii'
})

module.exports = router;