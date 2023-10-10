const express = require('express')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const app = express()
app.use(cookieParser())

//
const userStore = {}
const secretKey = 'mysecretkey'
function authenticateUser(req, res, next) {
    const sessionId = req.cookies.sessionId
    if (sessionId && userStore[sessionId]) {
        req.user = userStore[sessionId]
    }
    next()
}
app.use(authenticateUser)
//route
app.get('/', (req, res) => {
    const sessionId = crypto.randomBytes(16).toString('hex')
    const username = 'duongngochai'

    userStore[sessionId] = { username }

    res.cookie('sessionId', sessionId)
    res.send('Dang nhap thanh cong')
})

app.get('/profile', (req, res) => {
    if (req.user) {
        res.send(`Username: ${req.user.username}`)
    } else {
        res.send('Vui long dang nhap')
    }
})

app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId
    if (sessionId) {
        delete userStore[sessionId]
        res.clearCookie('sessionId')
    }
    res.send('Da dang xuat!')
})

app.listen(3000, () => {
    console.log('App running...')
})
