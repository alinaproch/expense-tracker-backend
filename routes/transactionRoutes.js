import express from "express";
import { check } from "express-validator";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post(
  "/",
  [
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be a positive number"),
    check("budgetId").isUUID().withMessage("Invalid budget ID"),
    check("categoryId").isUUID().withMessage("Invalid category ID"),
  ],
  createTransaction
);

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
