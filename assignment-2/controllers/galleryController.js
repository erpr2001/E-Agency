// controllers/galleryController.js
const Gallery = require('../models/gallery');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

exports.uploadImage = upload.single('image');

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newGalleryItem = new Gallery({
      title,
      description,
      imageUrl: req.file.path,
    });
    await newGalleryItem.save();
    res.json(newGalleryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addGalleryItem = async (req, res) => {
  try {
    const newItem = new GalleryItem({
      title: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    await newItem.save();
    res.status(201).json({ message: 'Gallery item added', newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
};