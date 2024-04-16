require ('dotenv').config({path:"./src/.env"})
const express = require('express')
const app = express()
const cors= require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT ||3000
const gitRoutes = require('./routes/gitRoutes')
app.use(cors())
app.use(express.json())
app.use('/api/git',gitRoutes)
mongoose
    .connect(process.env.DB_URI)
    .then(()=>{
        app.listen(PORT,()=>{console.log(`connected to DB and listening at port ${PORT}`)})
    })
    .catch((e)=>console.log(e))
