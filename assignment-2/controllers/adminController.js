// controllers/adminController.js
const Admin = require('../models/admin');
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
  try {
    // Fetch all users or gallery items based on your requirement
    const admins = await Admin.find();  // If you want to fetch users
    const galleryItems = await Gallery.find();  // If you want to fetch gallery items

    res.json({
      admins,        // Include users if needed
      galleryItems  // Include gallery items if needed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};