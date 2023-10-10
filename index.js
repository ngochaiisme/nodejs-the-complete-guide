const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(
    session({
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: true,
    })
)
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    if (req.session.username) {
        // Hiển thị danh sách bài viết của người dùng đã đăng nhập
        const userPosts = req.session.userPosts || []
        res.send(`Welcome, ${req.session.username}!<br> Your Posts: ${userPosts.join(', ')}`)
    } else {
        res.send('Ban chua dang nhap')
    }
})

app.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"><br>
      <input type="submit" value="Login">
    </form>
  `)
})

app.post('/login', (req, res) => {
    // Xử lý đăng nhập và lưu trạng thái đăng nhập vào session
    const username = req.body.username
    if (username) {
        req.session.username = username
        req.session.userPosts = []
        res.redirect('/')
    } else {
        res.send('Please enter a valid username.')
    }
})

app.post('/post', (req, res) => {
    if (req.session.username) {
        // Thêm bài viết mới vào danh sách của người dùng
        const newPost = req.body.post
        req.session.userPosts.push(newPost)
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    // Xóa trạng thái đăng nhập từ session
    req.session.destroy()
    res.redirect('/login')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
