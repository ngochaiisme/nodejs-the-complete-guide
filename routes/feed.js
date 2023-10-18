const router = require('express').Router()
const { body } = require('express-validator')

const feedController = require('../controllers/feed')

//GET /feed/posts
router.get('/posts', feedController.getPosts)
//Get post/:postId
router.get('/post/:postId', feedController.getPost)

//POST /feed/post
router.post(
    '/post',
    [body('title').trim().isLength({ min: 6 }), body('content').trim().isLength({ min: 5 })],
    feedController.createPost
)

module.exports = router
