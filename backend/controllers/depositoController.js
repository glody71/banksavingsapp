const DepositoTypes = require("../models/depositoModel");

const depositoController = {
  // GET
  async getAllDepositoTypes(req, res) {
    try {
      const result = await DepositoTypes.getAllDepositoTypes();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // GET by ID
  async getDepositoTypeById(req, res) {
    try {
      const { id } = req.params;
      const result = await DepositoTypes.getOneDepositoTypes(id);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Deposito Type not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST
  async createDepositoTypes(req, res) {
    try {
      const { name, yearly_return } = req.body;

      if (!name || !yearly_return) {
        return res
          .status(400)
          .json({ message: "Name and yearly_return are required" });
      }

      const result = await DepositoTypes.createDepositoTypes(
        name,
        yearly_return
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT
  async updateDepositoType(req, res) {
    try {
      const { id } = req.params;
      const { name, yearly_return } = req.body;

      const result = await DepositoTypes.updateDepositoTypes(
        id,
        name,
        yearly_return
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Deposito type not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE
  async deleteDepositoTypes(req, res) {
    try {
      const { id } = req.params;

      await DepositoTypes.deleteDepositoTypes(id);
      res.json({ message: "Deposito Type deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = depositoController;