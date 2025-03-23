import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import botRoutes from "./routes/botRoute.js";
// import taxRoutes from "./routes/taxRoute.js";
import userRoutes from "./routes/userRoute.js";
import finRoutes from "./routes/finRoute.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Database Connection
// connectDB();

// Routes
app.use("/user/api", userRoutes);
// Routes
app.use('/api/financial', finRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/study_plans')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Root Route
app.get("/", (req, res) => {
    res.send("🚀 Financial Advisor API is running!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
