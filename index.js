const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

// Cấu hình Multer để lưu tệp vào thư mục uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Thư mục lưu trữ tệp
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({ storage: storage })

app.use(express.static('public')) // Thư mục public chứa các tài liệu tĩnh (ví dụ: hình ảnh)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) // Trang HTML cho phép tải lên tệp
})

app.post('/upload', upload.single('image'), (req, res) => {
    // Xử lý sau khi tải lên thành công
    res.send('Tệp đã được tải lên thành công.')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
