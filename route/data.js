const express = require('express')
const con = require('./mysql_con')
const mysqldata = require('../controler/mysqldata')

const router = express.Router()

// CRUD API
 
router.post('/register', mysqldata.reg) // Creat

router.get('/register/list', mysqldata.regList);  //Reat

router.put('/forgot_password/:id', mysqldata.forgot ); //Update

router.post('/login/delete/:id', mysqldata.loginDelete); //Delete

router.post('/login', mysqldata.login);

router.get('/login/list', mysqldata.loginList);


module.exports = router