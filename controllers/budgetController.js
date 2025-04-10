import Budget from "../models/Budget.js";
import { validationResult } from "express-validator";

export const createBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, amount } = req.body;
  try {
    const budget = await Budget.create({ name, amount });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Error creating budget" });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching budgets" });
  }
};

export const getBudgetById = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findByPk(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Error fetching budget" });
  }
};

export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;
  try {
    const budget = await Budget.findByPk(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    budget.name = name;
    budget.amount = amount;
    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Error updating budget" });
  }
};

export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findByPk(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    await budget.destroy();
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting budget" });
  }
};
