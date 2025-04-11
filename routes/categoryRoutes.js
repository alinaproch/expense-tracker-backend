import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [check("name").notEmpty().withMessage("Category name is required")],
  validateRequest,
  createCategory
);

router.get("/", authMiddleware, getCategories);

export default router;
