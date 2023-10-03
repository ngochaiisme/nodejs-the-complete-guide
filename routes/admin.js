const path = require('path')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

// /admin/products => GET
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.createProduct)

// /admin/products/:id
router.get('/product/:id', adminController.getProduct)

// /admin/edit-product/:id
router.put('/edit-product/:id', adminController.updateProduct)

// /admin/delete-product/:id
router.delete('/delete-product/:id', adminController.deleteProduct)

// /admin/create-user
router.post('/create-user', adminController.createUser)

module.exports = router
