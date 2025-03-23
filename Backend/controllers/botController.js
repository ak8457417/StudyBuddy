import { botCollection } from "../config/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {ObjectId} from "mongodb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const generateFinancialPlan = async (req, res) => {
    const { name, income, expenses, goal_description, goal_amount, timeframe } = req.body;

    if (!name || !income || !expenses || !goal_description || !goal_amount || !timeframe) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const prompt = `
    You are a financial advisor. Generate a detailed financial plan for ${name}:
    - Monthly Income: ₹${income}
    - Monthly Expenses: ₹${expenses}
    - Goal: ${goal_description}
    - Goal Amount: ₹${goal_amount}
    - Timeframe: ${timeframe} years
    `;

    try {
        const response = await model.generateContent(prompt);
        const plan = response.response.candidates[0].content.parts[0].text;

        const monthly_savings_needed = goal_amount / (timeframe * 12);

        const data = {
            name,
            income,
            expenses,
            goal_description,
            goal_amount,
            timeframe,
            monthly_saving_amount: monthly_savings_needed,
            financial_plan: plan,
        };

        await botCollection.insertOne(data);
        res.json(data);
    } catch (error) {
        console.error("❌ Error generating financial plan:", error);
        res.status(500).json({ error: "Error generating financial plan." });
    }
};

export const getFinancialPlans = async (req, res) => {
    try {
        const plans = await botCollection.find().toArray();
        res.json(plans);
    } catch (error) {
        console.error("❌ Error fetching financial plans:", error);
        res.status(500).json({ error: "Error fetching financial plans." });
    }
};

export const deleteFinancialPlan = async (req, res) => {
    try {
        const { id } = req.body;

        const x = new ObjectId(id);

        const del = await botCollection.deleteOne({ _id: x });
        if (del.deletedCount === 1) {
            res.status(200).json({ message: "Plan deleted successfully" });
        } else {
            res.status(404).json({ error: "Plan not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Error deleting financial plan." });
    }
};