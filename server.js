const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodiesx
app.use(express.json());

const PORT = process.env.PORT || 3001;
const IP = '34.116.155.145 ';

const authRoutes = require("./routers/authRoutes.js");
const itemsRoutes = require("./routers/itemsRoutes.js");
const userRoutes = require("./routers/userRoutes.js");
const imageRoutes = require("./routers/imageRoutes.js");

app.use(authRoutes);
app.use(itemsRoutes);
app.use(userRoutes);
app.use(imageRoutes);

app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
