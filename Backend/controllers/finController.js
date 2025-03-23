import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/study_plans", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Get all plans
export const getPlans = async (req, res) => {
    try {
        const plans = await db.collection("plans").find({}).toArray();
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error getting plans:", error);
        res.status(500).json({ message: "Error retrieving study plans", error: error.message });
    }
};

export const getQuizzes = async (req, res) => {
    try {
        const plans = await db.collection("quizzes").find({}).toArray();
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error getting plans:", error);
        res.status(500).json({ message: "Error retrieving study plans", error: error.message });
    }
};



// Get a specific plan by ID
export const getPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await db.collection("plans").findOne({ _id: new ObjectId(id) });

        if (!plan) {
            return res.status(404).json({ message: "Study plan not found" });
        }

        res.status(200).json(plan);
    } catch (error) {
        console.error("Error getting plan:", error);
        res.status(500).json({ message: "Error retrieving study plan", error: error.message });
    }
};

// Delete a plan
export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.collection("plans").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Study plan not found" });
        }

        res.status(200).json({ message: "Study plan deleted successfully" });
    } catch (error) {
        console.error("Error deleting plan:", error);
        res.status(500).json({ message: "Error deleting study plan", error: error.message });
    }
};

// Update a plan
export const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const result = await db.collection("plans").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updates, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Study plan not found" });
        }

        res.status(200).json({ message: "Study plan updated successfully" });
    } catch (error) {
        console.error("Error updating plan:", error);
        res.status(500).json({ message: "Error updating study plan", error: error.message });
    }
};
