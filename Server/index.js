const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./routes/authRoute')
const { connectDbAndRunServer } = require('./configs/db')
require('dotenv').config()

/**
 * NOTES
 * Email Service will be added 
 * Logger Service will be added (Winston or similar)
 */

const app = express()

// middlewares
app.use(cors(
    //We will add configuration later
))
app.use(express.json())
app.use(helmet())

//routes
app.use('/api/v1/auth', authRouter);

//health check
app.use('/api/v1/healthy', (req, res) => {
    try {
        return res.status(200).json({message:"Healthy"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

connectDbAndRunServer(app);
