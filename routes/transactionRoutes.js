import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:budgetId", protect, getTransactions);

router.post("/", protect, createTransaction);

router.delete("/:id", protect, deleteTransaction);

export default router;
