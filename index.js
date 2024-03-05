require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors') // Import the cors module

app.use(cors()) // Enable CORS for all routes



mongoose.connect(`mongodb+srv://test_user:test_123@cluster0.rjj5oiq.mongodb.net/Demodb?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Successful deployment!')
})


const messageRouter = require('./routes/messages')
app.use('/messages', messageRouter)

app.listen(3000, () => console.log('Server Started'))