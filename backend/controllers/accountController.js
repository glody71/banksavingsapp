const Accounts = require("../models/accountModel");

const accountController = {
  async getAll(req, res) {
    try {
      const result = await Accounts.getAll();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await Accounts.getById(id);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getByCustomer(req, res) {
    try {
      const { customerId } = req.params;

      const result = await Accounts.getByCustomer(customerId);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { packet, customer_id, deposito_type_id, balance } = req.body;

      if (!packet || !customer_id || !deposito_type_id) {
        return res.status(400).json({
          message: "packet, customer_id, and deposito_type_id are required",
        });
      }

      const result = await Accounts.create(
        packet,
        customer_id,
        deposito_type_id,
        balance || 0
      );

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { packet, customer_id, deposito_type_id, balance } = req.body;

      const result = await Accounts.update(
        id,
        packet,
        customer_id,
        deposito_type_id,
        balance
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Accounts.delete(id);

      res.json({ message: "Account deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = accountController;
