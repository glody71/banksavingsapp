const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// GET all customers
router.get("/", customerController.getAll);

// GET one customer by ID
router.get("/:id", customerController.getById);

// CREATE customer
router.post("/", customerController.create);

// UPDATE customer
router.put("/:id", customerController.update);

// DELETE customer
router.delete("/:id", customerController.delete);

module.exports = router;
