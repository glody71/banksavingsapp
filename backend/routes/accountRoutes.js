const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

// CRUD
router.get("/", accountController.getAll);
router.get("/customer/:customerId", accountController.getByCustomer);
router.get("/:id", accountController.getById);
router.post("/", accountController.create);
router.put("/:id", accountController.update);
router.delete("/:id", accountController.delete);

module.exports = router;
