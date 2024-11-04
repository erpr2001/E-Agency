// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

router.post('/add', galleryController.uploadImage, galleryController.createGalleryItem);
router.get('/', galleryController.getGalleryItems);

module.exports = router;