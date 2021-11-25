const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');


router.post('/',(req, res, next)=>{
    var username = req.body.username;
    var email = req.body.password;
    var password = req.body.password;
    var sql = '';
    var dataSql = [username, email, password]
    console.log(dataSql)

    pool.getConnection(function(err, connection){
        if(err){
            console.log('error  Login First')
            res.status(400).json({
                err: err,
            })
        }else{
            connection.query(sql,dataSql, function (error, results, fields) {
                connection.release();
                   if(error){
                            console.log("APP LOGIN_2"+error);
                            res.status(400).json({
                               error: error
                            });
                      }else{
                            if(results.length > 0 ){
                               user=results[0]
                               jwt.sign({data:user}, user.phonenumber, (err, token) => {
                                        if(err){
                                           console.log("APP LOGIN_3"+err);
                                        }
                                        delete user.password;
                                        delete user.dateCreated;
                                        delete user.PIN;
                                        res.status(200).json({
                                           message: 'success',
                                           data: user,
                                           token:token
                                        });
                               });
                            }else{
                               res.status(400).json({
                                        error: "user_not_match",
                                        message:'user_not_match'
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