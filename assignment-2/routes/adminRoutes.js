// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/data',adminController.getAllRegisteredData);
router.get('/data/:id', adminController.getAdminById); // Read Single
router.put('/data/:id', adminController.updateAdmin); // Update
router.delete('/data/:id', adminController.softDeleteAdmin); // Soft delete admin by ID

module.exports = router;