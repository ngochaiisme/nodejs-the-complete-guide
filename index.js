const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const cors = require('cors')

const feedRoutes = require('./routes/feed')

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    },
})
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    )
        cb(null, true)
    else cb(null, false)
}

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

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
