exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
    })
}

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'ID = 1234jfhdhsf31')
    res.send('IsLogin')
}
