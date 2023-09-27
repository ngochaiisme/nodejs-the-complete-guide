const http = require('http')
const port = 3000
const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(`<body>
                        <form action="/create-user" method="POST">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" required>
                            <button type="submit">Ok</button>
                        </form>
                    </body>`)
            break
        case '/user':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('<ul><li>1</li><li>2</li></ul>')
            break
        case '/create-user':
            if (req.method === 'POST') {
                let userData = ''
                req.on('data', (chunk) => {
                    userData = userData + chunk
                })
                req.on('end', () => {
                    const parsedData = new URLSearchParams(userData)
                    const username = parsedData.get('username')
                    console.log('User name:', username)
                    res.writeHead(302, { Location: '/' })
                    res.end()
                })
            }
            break
        default:
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('Error')
    }
})

server.listen(port, () => {
    console.log(`Server running at http://:${port}/`)
})
