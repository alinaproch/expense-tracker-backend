import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const transactions = await Transaction.findAll({
      where: { BudgetId: budgetId },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};
