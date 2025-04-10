import express from "express";
import { register, login } from "../controllers/userController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").exists().withMessage("Password is required"),
  ],
  login
);

export default router;
