import express from 'express';
import {
    getPlans,
    getPlanById,
    deletePlan,
    updatePlan, getQuizzes
} from '../controllers/finController.js';

const router = express.Router();

// Get all financial plans (with optional name filter)
router.get('/plans', getPlans);

router.get('/quizzes', getQuizzes);

// Get specific financial plan by ID
router.get('/plans/:id', getPlanById);

// Delete financial plan
router.delete('/plans/:id', deletePlan);

// Update financial plan
router.put('/plans/:id', updatePlan);

export default router;