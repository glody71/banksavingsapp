const db = require("../config/db");

const Accounts = {
  getAll() {
    return db.query(`
      SELECT a.*, c.name AS customer_name, d.name AS deposito_name, d.yearly_return
      FROM accounts a
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN deposito_types d ON a.deposito_type_id = d.id
      ORDER BY a.id
    `);
  },

  getById(id) {
    return db.query(
      `
      SELECT a.*, c.name AS customer_name, d.name AS deposito_name, d.yearly_return
      FROM accounts a
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN deposito_types d ON a.deposito_type_id = d.id
      WHERE a.id = $1
      `,
      [id]
    );
  },

  getByCustomer(customerId) {
    return db.query(
      `
      SELECT a.*, 
             c.name AS customer_name, 
             d.name AS deposito_name, 
             d.yearly_return
      FROM accounts a
      JOIN customers c ON a.customer_id = c.id
      JOIN deposito_types d ON a.deposito_type_id = d.id
      WHERE a.customer_id = $1
      ORDER BY a.id;
      `,
      [customerId]
    );
  },

  create(packet, customer_id, deposito_type_id, balance) {
    return db.query(
      `
      INSERT INTO accounts (packet, customer_id, deposito_type_id, balance)
      VALUES ($1, $2, $3, $4) 
      RETURNING *
      `,
      [packet, customer_id, deposito_type_id, balance]
    );
  },

  update(id, packet, customer_id, deposito_type_id, balance) {
    return db.query(
      `
      UPDATE accounts
      SET packet=$1, customer_id=$2, deposito_type_id=$3, balance=$4
      WHERE id=$5
      RETURNING *
      `,
      [packet, customer_id, deposito_type_id, balance, id]
    );
  },

  delete(id) {
    return db.query("DELETE FROM accounts WHERE id = $1", [id]);
  },
};



module.exports = Accounts;
