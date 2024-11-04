// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// router.post('/add', galleryController.uploadImage, galleryController.createGalleryItem);
router.get('/', galleryController.getAllGalleryItems);
router.get('/item/:id', galleryController.getGalleryItemById); // Read Single
router.delete('/item/:id', galleryController.softDeleteGalleryItem); // Soft delete gallery item by ID
router.put('/item/:id', galleryController.updateGalleryItem); // Update
router.post('/item', galleryController.createGalleryItem); // Create
module.exports = router;