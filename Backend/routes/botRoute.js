import express from "express";
import { generateFinancialPlan, getFinancialPlans, deleteFinancialPlan } from "../controllers/botController.js";

const router = express.Router();

router.post("/generate-plan", generateFinancialPlan);
router.get("/get-plans", getFinancialPlans);
router.post("/del-plan", deleteFinancialPlan);

export default router;
