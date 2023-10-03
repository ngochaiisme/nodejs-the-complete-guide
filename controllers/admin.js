const Product = require('../models/product')
const User = require('../models/user')
exports.createProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
    })
    product
        .save()
        .then((result) => {
            console.log(result)
            res.status(200).json({ message: 'success' })
        })
        .catch((err) => {
            res.status(500).json({ message: err })
        })
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => res.status(500).json({ message: err }))
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.status(200).send(product)
        })
        .catch((err) => res.status(500).json({ message: err }))
}

exports.updateProduct = (req, res, next) => {
    const Id = req.params.id
    const newTitle = req.body.title
    const newPrice = req.body.price
    const newDescripton = req.body.description
    const newImageUrl = req.body.imageUrl

    Product.findByIdAndUpdate(
        Id,
        {
            title: newTitle,
            price: newPrice,
            description: newDescripton,
            imageUrl: newImageUrl,
        },
        { returnDocument: 'after' },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            console.log(doc)
            res.status(200).send({ message: 'success' })
        }
    )
}

exports.deleteProduct = (req, res, next) => {
    const Id = req.params.id
    Product.findByIdAndDelete(Id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).send('error')
        } else {
            console.log(doc)
            res.status(200).send({ message: 'success' })
        }
    })
}

exports.createUser = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const cart = req.body.cart

    const newUser = new User({ name, email, cart })
    newUser
        .save()
        .then((result) => {
            console.log(result)
            res.status(200).json({ message: 'success' })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: err })
        })
}
