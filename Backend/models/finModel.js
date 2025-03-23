import mongoose from 'mongoose';

const financialPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    income: {
        type: Number,
        required: true,
        min: 0
    },
    expenses: {
        type: Number,
        required: true,
        min: 0
    },
    goalDescription: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    timeframe: {
        type: Number,
        required: true,
        min: 1
    },
    monthlySavingAmount: {
        type: Number,
        required: true,
        min: 0
    },
    adjustedGoalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    financialPlan: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
financialPlanSchema.index({ name: 1 });
financialPlanSchema.index({ createdAt: -1 });

const FinancialPlan = mongoose.models.FinancialPlan || mongoose.model('FinancialPlan', financialPlanSchema);

export default FinancialPlan;