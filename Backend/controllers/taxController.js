import { taxCollection } from "../config/db.js";

// Function to calculate tax
export const calculateTax = async (req, res) => {
    try {
        const { salary, investments = 0, hra = 0, medical = 0 } = req.body;

        if (!salary || salary < 0) {
            return res.status(400).json({ error: "Invalid salary amount." });
        }

        const deductions = investments + hra + medical;
        let taxableIncome = Math.max(salary - deductions, 0);
        let taxAmount = 0;

        const taxSlabs = [
            { limit: 250000, upperLimit: 500000, rate: 5 },
            { limit: 500000, upperLimit: 1000000, rate: 20 },
            { limit: 1000000, upperLimit: Infinity, rate: 30 },
        ];

        for (let slab of taxSlabs) {
            if (taxableIncome > slab.limit) {
                let applicableIncome = Math.min(taxableIncome, slab.upperLimit) - slab.limit;
                taxAmount += applicableIncome * (slab.rate / 100);
            }
        }

        const tds = Math.min(taxAmount, 10000); // Assume 10k TDS deducted for now
        const refund = Math.max(0, tds - taxAmount);

        const taxData = { salary, deductions, taxableIncome, taxAmount, tds, refund, timestamp: new Date() };

        await taxCollection.insertOne(taxData);
        res.json({ taxableIncome, taxAmount, tds, refund, message: "Tax calculated successfully." });

    } catch (error) {
        console.error("❌ Error calculating tax:", error);
        res.status(500).json({ error: "Server error while calculating tax." });
    }
};

// Function to get all tax records
export const getTaxRecords = async (req, res) => {
    try {
        const records = await taxCollection.find().sort({ timestamp: -1 }).toArray();
        res.json(records);
    } catch (error) {
        console.error("❌ Error fetching tax records:", error);
        res.status(500).json({ error: "Server error while fetching tax records." });
    }
};
