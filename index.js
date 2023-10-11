const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'haitacdz007@gmail.com',
        pass: 'gkbo yatj wisj qlve', // Sử dụng Mật khẩu ứng dụng đã tạo
    },
})

const app = express()
app.use(express.urlencoded({ extended: false }))

mongoose
    .connect(
        'mongodb+srv://dnh:dnh@cluster0.jyt8pn6.mongodb.net/udemy_test?retryWrites=true&w=majority'
    )
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.log(err))

// model
const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        resetPassToken: {
            type: String,
        },
    },
    { timestamps: true }
)
const User = mongoose.model('User', userSchema)

// tao moi 1 User de su dung

// const [fullname, email, password] = ['Duong Ngoc Hai', 'dngochai0511@gmail.com', 'admin12345']
// const salt = 10
// var hashPassword
// bcrypt
//     .hash(password, salt)
//     .then((hash) => {
//         const newUser = new User({ fullname, email, password: hash })
//         return newUser.save()
//     })
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

// //so sanh dung bcrypt
// bcrypt
//     .compare('admin12345', '$2b$10$qN3GxPCxPRNaH.oXab9B/evll6lccQtI4/SHvdqikKKB6kvwLz7Ni')
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

// Hiển thị trang đăng nhập
app.get('/', (req, res) => {
    const loginForm = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Login Page</title>
      </head>
      <body>
          <h1>Login Page</h1>
          <form method="POST" action="/login">
              <label for="email">Email:</label>
              <input type="text" id="email" name="email" required><br>
  
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required><br>
  
              <input type="submit" value="Login">
          </form>
      </body>
      </html>
    `
    res.send(loginForm)
})

app.get('/reset', (req, res) => {
    const resetForm = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Reset Page</title>
      </head>
      <body>
          <h1>Login Page</h1>
          <form method="POST" action="/reset">
             
              <label for="email">Enter your email:</label>
              <input type="text" id="email" name="email" required><br>
  
              <input type="submit" value="submit">
          </form>
      </body>
      </html>
    `
    res.send(resetForm)
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email })
        .then((user) => {
            if (user == null) return res.send('Sai thong tin')
            bcrypt
                .compare(password, user.password)
                .then((result) => {
                    if (result) res.send(user)
                    else res.send('Sai mat khau')
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
})

app.post('/reset', (req, res) => {
    const email = req.body.email

    User.findOne({ email })
        .then((user) => {
            if (user == null) return res.send('Email khong ton tai trong he thong')
            const resetToken = crypto.randomBytes(32).toString('hex')
            user.resetPassToken = resetToken
            user.save()
                .then(() => {
                    const mailOptions = {
                        from: 'Shop Rose <shoprose@rose.com>',
                        to: 'dngochai0511@gmail.com',
                        subject: 'Reset Password',
                        html: `
                            <p>Xin chào bạn,</p>
                            <p>Vui lòng nhấp vào liên kết dưới đây để xác thực tài khoản của bạn:</p>
                            <a href="http://localhost:3000/reset/${resetToken}">Đổi mật khẩu</a>
                            <p>Nếu bạn không yêu cầu xác thực, bạn có thể bỏ qua email này.</p>
                            <img src="https://d2vrvpw63099lz.cloudfront.net/whatsapp-business-account-verifizieren/whatsapp-unternehmensaccount-verifizieren.png" alt="Hình ảnh chuyên nghiệp" style="width: 300px; height: auto;">
                    
                        `,
                    }

                    // Gửi email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('Gửi email thất bại: ' + error)
                        } else {
                            res.send('Kiem tra email de doi mat khau')
                            console.log('Email đã được gửi: ' + info.response)
                        }
                    })
                })
                .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
})

app.get('/reset/:token', (req, res) => {
    resetPassToken = req.params.token

    User.findOne({ resetPassToken })
        .then((result) => {
            const resetPasswordForm = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Change Password</title>
        </head>
        <body>
            <h1>Login Page</h1>
            <form method="POST" action="/changePassword">
                <p>Xin chao ${result.fullname}</p>
                <label for="newpass">Enter your new password:</label>
                <input type="text" id="newpass" name="newpassword" required><br>
                <input type="hidden" id="newpass" name="email" value="${result.email}"><br>

    
                <input type="submit" value="submit">
            </form>
        </body>
        </html>
      `
            res.send(resetPasswordForm)
        })
        .catch((err) => res.send(err))
})

app.post('/changePassword', (req, res) => {
    const newpassword = req.body.newpassword
    const email = req.body.email
    bcrypt
        .hash(newpassword, 10)
        .then((hashedPass) => {
            User.findOneAndUpdate(
                { email },
                { $set: { password: hashedPass, resetPassToken: null } },
                { new: true }
            )
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ error: 'Không tìm thấy người dùng.' })
                    }

                    res.status(200).json({
                        message: 'Mật khẩu đã được thay đổi thành công.',
                        newpass: newpassword,
                        user,
                    })
                })
                .catch((err) => {
                    console.error('Lỗi khi cập nhật mật khẩu:', err)
                    res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật mật khẩu.' })
                })
        })
        .catch((err) => res.send(500).json({ message: 'Loi hash password', error: err }))
})

app.listen(3000, () => console.log('App listening...'))
