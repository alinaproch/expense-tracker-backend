import express from "express";
import { check } from "express-validator";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

router.post(
  "/",
  [
    check("name").not().isEmpty().withMessage("Budget name is required"),
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be a positive number"),
  ],
  createBudget
);

router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

export default router;
