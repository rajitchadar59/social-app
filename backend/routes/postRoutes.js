const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getAllPosts, likePost, commentPost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware'); // Authorization import

const upload = multer();

router.get('/', getAllPosts); // Public feed (No auth needed usually)
router.post('/', auth, upload.single('image'), createPost); // Protect
router.put('/:id/like', auth, likePost); // Protect
router.post('/:id/comment', auth, commentPost); // Protect

module.exports = router;