const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3001;
const IP = '0.0.0.0'; // Listen on all available network interfaces

const authRoutes = require("./routers/authRoutes.js");
const itemsRoutes = require("./routers/itemsRoutes.js");
const userRoutes = require("./routers/userRoutes.js");
const imageRoutes = require("./routers/imageRoutes.js");

app.use(authRoutes);
app.use(itemsRoutes);
app.use(userRoutes);
app.use(imageRoutes);

// Start the server
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
