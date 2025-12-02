// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/account/:accountId", transactionController.getTransactionsByAccount);
router.get("/", transactionController.getAllTransactions);

module.exports = router;
