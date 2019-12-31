const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Connect to db
connectDB()

// use json
app.use(express.json({ extented: false }))

// Define Routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

// Server
const PORT = 5000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))