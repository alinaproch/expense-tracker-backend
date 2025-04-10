import Transaction from "../models/Transaction.js";
import { validationResult } from "express-validator";

export const createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, description, budgetId, categoryId } = req.body;
  try {
    const transaction = await Transaction.create({
      amount,
      description,
      budgetId,
      categoryId,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, description, budgetId, categoryId } = req.body;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });

    transaction.amount = amount;
    transaction.description = description;
    transaction.budgetId = budgetId;
    transaction.categoryId = categoryId;
    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error updating transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });

    await transaction.destroy();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting transaction" });
  }
};
