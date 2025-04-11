import express from "express";
import { register, login } from "../controllers/userController.js";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  validateRequest,
  register
);

router.post(
  "/login",
  [check("email").isEmail(), check("password").exists()],
  validateRequest,
  login
);

export default router;
