// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static images

// Routes
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
