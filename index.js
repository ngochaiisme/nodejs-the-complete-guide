const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const feedRoutes = require('./routes/feed')

const app = express()

//middleware
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Mehtods', 'OPTIONS,GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()
})

//Route
app.use('/feed', feedRoutes)
app.get('/', (req, res) => res.send({ hello: 'hi' }))

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})

mongoose
    .connect(
        'mongodb+srv://dnh:dnh@cluster0.jyt8pn6.mongodb.net/udemy_test?retryWrites=true&w=majority'
    )
    .then(() => app.listen(3001, () => console.log('App listening...')))
    .catch((err) => console.log(err))
