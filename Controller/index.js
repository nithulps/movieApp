

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./Router/router')
require('./DB/connection')

const bmsServer=express()

//dataSharing
bmsServer.use(cors())

//parse json

bmsServer.use(express.json())
bmsServer.use(router)
bmsServer.use('/Uploads',express.static('./Uploads'))

const PORT=3000 || process.env.PORT

bmsServer.listen(PORT,()=>{
    console.log(`BME Server start listening at port:${PORT}`);
})

bmsServer.get('/',(req,res)=>{
    res.send("<h1>BMS Server is live.......</h1>")
})

