# Ứng dụng Tải lên Hình Ảnh sử dụng Node.js và Multer

Ứng dụng này sử dụng thư viện Multer để cho phép người dùng tải lên hình ảnh và lưu chúng vào máy chủ sử dụng Node.js. Dưới đây là mô tả cụ thể về cách Multer được sử dụng trong ứng dụng này:

## Multer

Multer là một middleware Node.js được sử dụng để xử lý tải lên tệp (file uploads) trong ứng dụng web. Trong đoạn mã, chúng ta sử dụng Multer để cấu hình cách lưu trữ và đặt tên cho hình ảnh tải lên. Sau đây là cách Multer được cấu hình và sử dụng:

### Cấu hình Lưu trữ

```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Thư mục lưu trữ tệp
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})
```

-   `multer.diskStorage`: Chúng ta sử dụng `diskStorage` để lưu trữ tệp tải lên trong thư mục trên máy chủ.

-   `destination`: Hàm này xác định thư mục mà tệp sẽ được lưu trữ. Trong ví dụ này, chúng ta lưu trữ hình ảnh trong thư mục `'uploads/'`.

-   `filename`: Hàm này xác định tên của tệp tải lên. Trong ví dụ này, chúng ta sử dụng trường `field name` của tệp (trường 'image') cùng với một dấu thời gian để tạo tên duy nhất cho tệp.

### Sử dụng Multer Middleware

```javascript
const upload = multer({ storage: storage })
```

Chúng ta tạo một đối tượng Multer bằng cách sử dụng cấu hình lưu trữ đã được định nghĩa. Đối tượng này sau đó được sử dụng để xử lý tải lên hình ảnh trên tuyến đường `/upload`.

## Sử dụng

-   Để sử dụng ứng dụng, bạn cần chạy nó bằng lệnh `node your_app.js` và truy cập trang web tại [http://localhost:3000/](http://localhost:3000/).

-   Trên trang web, bạn sẽ thấy một trang HTML cho phép bạn chọn và tải lên hình ảnh. Sau khi bạn chọn hình ảnh và bấm nút "Tải lên", Multer sẽ xử lý tệp tải lên và lưu trữ chúng trong thư mục `uploads`.

-   Khi tải lên hoàn thành, bạn sẽ nhận được thông báo "Tệp đã được tải lên thành công."

## Cấu hình

-   Ứng dụng này đã được cấu hình để lưu trữ hình ảnh tải lên trong thư mục `uploads`. Nếu bạn muốn thay đổi nơi lưu trữ tệp, bạn có thể sửa đổi đường dẫn trong tệp `your_app.js`.
