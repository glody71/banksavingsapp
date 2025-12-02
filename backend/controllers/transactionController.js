// controllers/transactionController.js
const Transaction = require("../models/transactionModel");

exports.createTransaction = async (req, res) => {
  const { account_id, type, amount, transaction_date } = req.body;
  if (!account_id || !type || !amount) {
    return res.status(400).json({ message: "account_id, type, and amount are required" });
  }

  try {
    const transaction = await Transaction.create({ account_id, type, amount, transaction_date });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

exports.getTransactionsByAccount = async (req, res) => {
  try {
    const account_id = Number(req.params.accountId);
    const transactions = await Transaction.getByAccount(account_id);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get transactions" });
  }
};

exports.getAllTransactions = async (_req, res) => {
  try {
    const transactions = await Transaction.getAll();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get transactions" });
  }
};
