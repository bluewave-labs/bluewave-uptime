const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { connectDbAndRunServer } = require('./configs/db')
require('dotenv').config()


const app = express()

// middlewares
app.use(cors(
    //We will add configuration later
))
app.use(express.json())
app.use(helmet())

//routes


//health check
app.use('/api/v1/healthy', (req, res) => {
    try {
        return res.status(200).json({message:"Healthy"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

connectDbAndRunServer(app);
