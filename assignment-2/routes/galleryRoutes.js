// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('C:\Users\Spectre\OneDrive\Desktop\Carleton\Fall24\Web Development\E-Agency\assignment-2\controllers\galleryController.js');

router.post('/add', galleryController.uploadImage, galleryController.createGalleryItem);
router.get('/', galleryController.getGalleryItems);

module.exports = router;