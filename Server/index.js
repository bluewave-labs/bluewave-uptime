const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./routes/authRoute')
const { connectDbAndRunServer } = require('./configs/db')
require('dotenv').config()
// const { sendEmail } = require('./utils/sendEmail')


const app = express()

// middlewares
app.use(cors(
    //We will add configuration later
))
app.use(express.json())
app.use(helmet())

//routes
app.use('/api/v1/auth', authRouter);

// Testing email service
// app.use('/sendEmail', async (req, res) => {
//     const response = sendEmail('veysel.boybay@outlook.com', ['veysel.boybay@bluewavelabs.ca'], 'Testing email service', '<h1>Testing Bluewavelabs</h1>');
//     console.log(response);
// })

//health check
app.use('/api/v1/healthy', (req, res) => {
    try {
        return res.status(200).json({message:"Healthy"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

connectDbAndRunServer(app);
