import express from "express";
import { calculateTax, getTaxRecords } from "../controllers/taxController.js";

const router = express.Router();

router.post("/calculate", calculateTax);
router.get("/records", getTaxRecords);

export default router;
