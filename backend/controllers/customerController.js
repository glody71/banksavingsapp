const Customer = require("../models/customerModel");

const customerController = {
  //GET
  async getAll(req, res) {
    try {
      const result = await Customer.getAll();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await Customer.getById(id);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(result.rows[0]); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //POST
  async create(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const result = await Customer.create(name);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //delete
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Customer.delete(id);
      res.json({ message: "Customer deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //put
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const result = await Customer.update(id, name);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = customerController;
