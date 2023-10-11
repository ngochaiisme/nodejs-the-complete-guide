const nodemailer = require('nodemailer')

// Tạo một transporter (cài đặt dịch vụ email và sử dụng Mật khẩu ứng dụng)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'haitacdz007@gmail.com',
        pass: 'gkbo yatj wisj qlve', // Sử dụng Mật khẩu ứng dụng đã tạo
    },
})

// Cấu hình nội dung email với hình ảnh và hiệu ứng
const mailOptions = {
    from: 'Shop Rose <shoprose@rose.com>',
    to: 'dngochai0511@gmail.com',
    subject: 'Xác thực tài khoản của bạn',
    html: `
        <p>Xin chào bạn,</p>
        <p>Vui lòng nhấp vào liên kết dưới đây để xác thực tài khoản của bạn:</p>
        <a href="https://facebook.com/ngochai0511">Xác thực tài khoản</a>
        <p>Nếu bạn không yêu cầu xác thực, bạn có thể bỏ qua email này.</p>
        <img src="https://d2vrvpw63099lz.cloudfront.net/whatsapp-business-account-verifizieren/whatsapp-unternehmensaccount-verifizieren.png" alt="Hình ảnh chuyên nghiệp" style="width: 300px; height: auto;">

    `,
}

// Gửi email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Gửi email thất bại: ' + error)
    } else {
        console.log('Email đã được gửi: ' + info.response)
    }
})
