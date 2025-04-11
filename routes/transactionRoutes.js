import express from "express";
import { getTransactions } from "../controllers/transactionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Пример: /api/transactions/:budgetId?categoryId=...&dateFrom=...&sortBy=...
router.get("/:budgetId", authMiddleware, getTransactions);

export default router;
