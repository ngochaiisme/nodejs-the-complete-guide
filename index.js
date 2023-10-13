const express = require('express')
const { body, validationResult } = require('express-validator')

const app = express()
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const loginForm = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Dummy Page</title>
    </head>
    <body>
        <h1>Dummy Page</h1>
        <form method="POST" id="login-form">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email"><br>

            <div id="message" style="display: none;"></div>
            <input type="button" id="login-button" value="Login">
        </form>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
            $(document).ready(function() {
                $("#login-button").click(function() {
                    var email = $("#email").val();
                    $.ajax({
                        type: "POST",
                        url: "/login",
                        data: { email: email },
                        success: function(response) {
                            // Xử lý thành công - hiển thị thông báo
                            $("#message").text("Thành công: " + JSON.stringify(response));
                            $("#message").css("color", "green");
                            $("#message").show();
                        },
                        error: function(response) {
                            // Xử lý lỗi - hiển thị thông báo lỗi
                            $("#message").text("Lỗi: " + JSON.stringify(response.responseJSON.errors));
                            $("#message").css("color", "red");
                            $("#message").show();
                        }
                    });
                });
            });
        </script>
    </body>
    </html>
  `
    res.send(loginForm)
})

app.post(
    '/login',
    [
        body('email')
            .notEmpty()
            .withMessage('Tên người dùng không được để trống')
            .isEmail()
            .withMessage('Email không hợp lệ'),
        body('email')
            .custom((value, { req }) => {
                if (!value.includes('@gmail.com'))
                    throw new Error('Email phải kết thúc bằng @gmail.com')
                return true
            })
            .normalizeEmail(),
    ],
    (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        res.json(req.body)
    }
)

app.listen(3000, () => console.log('App listening...'))

//// khong su dung ajax

// const express = require('express')
// const { body, validationResult } = require('express-validator')

// const app = express()
// app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
//     const loginForm = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <title>Dummy Page</title>
//     </head>
//     <body>
//         <h1>Dummy Page</h1>
//         <form method="POST" action="/login">
//             <label for="email">Email:</label>
//             <input type="text" id="email" name="email"><br>
//             <div id="message" style="display: none;"></div>
//             <input type="submit" value="Login">
//         </form>
//     </body>
//     </html>
//   `
//     res.send(loginForm)
// })

// app.post(
//     '/login',
//     [
//         body('email')
//             .notEmpty()
//             .withMessage('Tên người dùng không được để trống')
//             .isEmail()
//             .withMessage('Email không hợp lệ'),
//         body('email').custom((value, { req }) => {
//             if (value !== 'dnh@gmail.com') throw new Error('Not match')
//             return true
//         }),
//     ],
//     (req, res) => {
//         const errors = validationResult(req)

//         if (!errors.isEmpty()) {
//             const errorMessage = errors
//                 .array()
//                 .map((error) => error.msg)
//                 .join('<br>')
//             const loginFormWithError = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Dummy Page</title>
//         </head>
//         <body>
//             <h1>Dummy Page</h1>
//             <form method="POST" action="/login">
//                 <label for="email">Email:</label>
//                 <input type="text" id="email" name="email"><br>
//                 <div id="message" style="color: red;">${errorMessage}</div>
//                 <input type="submit" value="Login">
//             </form>
//         </body>
//         </html>
//       `
//             res.send(loginFormWithError)
//         } else {
//             const successMessage = 'Đăng nhập thành công.'
//             const loginFormWithSuccess = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Dummy Page</title>
//         </head>
//         <body>
//             <h1>Dummy Page</h1>
//             <div id="message" style="color: green;">${successMessage}</div>
//             <form method="POST" action="/login">
//                 <label for="email">Email:</label>
//                 <input type="text" id="email" name="email"><br>
//                 <input type="submit" value="Login">
//             </form>
//         </body>
//         </html>
//       `
//             res.send(loginFormWithSuccess)
//         }
//     }
// )

// app.listen(3000, () => console.log('App listening...'))
