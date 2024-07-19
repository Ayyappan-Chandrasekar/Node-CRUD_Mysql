const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv =require('dotenv')
const router = require('./route/data');
const portN = process.env.port

const app = express()

dotenv.config({path: path.join(__dirname, 'config', 'temp.env')})

app.use(bodyParser.json());

app.use(router)
// app.use(router)

app.listen(process.env.port,()=>{
    console.log(`Server ${process.env.port} connected successfully`)
})