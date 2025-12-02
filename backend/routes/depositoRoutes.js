const express = require("express");
const router = express.Router();
const depositoController = require("../controllers/depositoController");

//GET ALL DEPOSITO
router.get("/", depositoController.getAllDepositoTypes);

//GET DEPOSITO BY ID
router.get("/:id", depositoController.getDepositoTypeById);

//POST
router.post("/", depositoController.createDepositoTypes);

//PUT
router.put("/:id", depositoController.updateDepositoType);

//DELETE
router.delete("/:id", depositoController.deleteDepositoTypes);



module.exports = router;
