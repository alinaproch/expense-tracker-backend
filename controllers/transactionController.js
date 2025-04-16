import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { amount, description, BudgetId, CategoryId } = req.body;

    if (!amount || !BudgetId || !CategoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await Transaction.create({
      amount,
      description,
      BudgetId,
      CategoryId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const transactions = await Transaction.findAll({
      where: { BudgetId: budgetId },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction", error });
  }
};
