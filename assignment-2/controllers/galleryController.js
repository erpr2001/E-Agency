// controllers/galleryController.js
const Gallery = require('../models/gallery');
// const Admin = require('../models/admin');
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

// exports.getGalleryItems = async (req, res) => {
//   try {
//     const items = await Gallery.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllGalleryItems = async (req, res) => {
  const { page = 1, limit = 10, fields } = req.query;

  try {
    const galleryItems = await Gallery.find({ isDeleted: false })
      .select(fields ? fields.split(',').join(' ') : '') // Limit fields if specified
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({ galleryItems });
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

exports.softDeleteGalleryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Gallery.findByIdAndUpdate(itemId, { isDeleted: true }, { new: true });
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    res.json({ message: 'Gallery item soft deleted successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read Single Gallery Item by ID
exports.getGalleryItemById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem || galleryItem.isDeleted) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(galleryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Gallery Item by ID
exports.updateGalleryItem = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  try {
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(req.params.id, { title, description, imageUrl }, { new: true });
    if (!updatedGalleryItem || updatedGalleryItem.isDeleted) return res.status(404).json({ message: 'Gallery item not found' });

    res.json({ message: 'Gallery item updated successfully', galleryItem: updatedGalleryItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

