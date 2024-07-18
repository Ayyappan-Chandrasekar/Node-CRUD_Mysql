const express = require('express')
const bodyParser = require('body-parser');
const router = require('./route/data');

const app = express()

app.use(bodyParser.json());

app.use(router)
app.use(router)

app.listen(3000,()=>{
    console.log("Server connected successfully")
})