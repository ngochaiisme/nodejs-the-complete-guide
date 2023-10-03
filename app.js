const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

//set up
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

//set middleware
app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//form-data

//Router
app.use('/admin', adminRoutes)
app.use(shopRoutes)

// get error page
app.use(errorController.get404)

//connect + listening
mongoose
    .connect(
        'mongodb+srv://dnh:dnh@cluster0.jyt8pn6.mongodb.net/udemy_test?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        }
    )
    .then((result) => {
        console.log('Conneted to Database!')
        app.listen(3000, () => {
            console.log('App listening...')
        })
    })
    .catch((err) => {
        console.log(err)
    })
