const express = require('express')
const session = require('express-session')
const csurf = require('csurf')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

//Sử dụng express-session để quản lý session
// app.use(
//     session({
//         secret: 'dnh', //
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false }, //tắt yêu cầu HTTPS
//     })
// )

// Sử dụng bodyParser để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: false }))

// Sử dụng csurf middleware với cấu hình sử dụng session
app.use(cookieParser())

const csrfProtection = csurf({
    cookie: true, //
})

// Gắn middleware csrfProtection cho tất cả các route cần bảo vệ
app.use(csrfProtection)

app.get('/', (req, res) => {
    // Lấy CSRF token từ session
    const csrfToken = req.csrfToken()
    res.send(`
    <h1>Truy cập được</h1>
    <form method="post" action="/process">
      <input type="hidden" name="_csrf" value="${csrfToken}">
      <input type="text" name="data" placeholder="Data">
      <button type="submit">Submit</button>
    </form>
  `)
})

app.post('/process', (req, res) => {
    const data = req.body.data
    res.send(`Dữ liệu đã được xử lý: ${data}`)
})

app.listen(3000, () => {
    console.log('Server đang chạy trên cổng 3000')
})
