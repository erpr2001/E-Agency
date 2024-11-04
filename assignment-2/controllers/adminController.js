// controllers/adminController.js
const Admin = require('../models/admin');
const Gallery = require('../models/gallery');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllRegisteredData = async (req, res) => {
  const { page = 1, limit = 10, fields } = req.query; // Pagination and field limiting from query params

  try {
    // Fetching admins (exclude soft-deleted admins)
    const admins = await Admin.find({ isDeleted: false })
      .select(fields ? fields.split(',').join(' ') : '') // Select specified fields
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Fetching gallery items (exclude soft-deleted items)
    const galleryItems = await Gallery.find({ isDeleted: false })
      .select(fields ? fields.split(',').join(' ') : '')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      admins,
      galleryItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findByIdAndUpdate(adminId, { isDeleted: true }, { new: true });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json({ message: 'Admin soft deleted successfully', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

////
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password'); // Exclude password
    if (!admin || admin.isDeleted) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const updatedFields = { username };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }
    const admin = await Admin.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!admin || admin.isDeleted) return res.status(404).json({ message: 'Admin not found' });

    res.json({ message: 'Admin updated successfully', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};