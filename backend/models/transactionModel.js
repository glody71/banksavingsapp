// models/transactionModel.js
const db = require("../config/db");

const Transaction = {
  async create({ account_id, type, amount, transaction_date }) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // Insert transaction
      const result = await client.query(
        `INSERT INTO transactions (account_id, type, amount, transaction_date)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [account_id, type, amount, transaction_date || new Date()]
      );

      // Update account balance
      if (type === "deposit") {
        await client.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [amount, account_id]);
      } else if (type === "withdraw") {
        await client.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [amount, account_id]);
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async getByAccount(account_id) {
    const result = await db.query(
      "SELECT * FROM transactions WHERE account_id = $1 ORDER BY transaction_date DESC",
      [account_id]
    );
    return result.rows;
  },

  async getAll() {
    const result = await db.query("SELECT * FROM transactions ORDER BY transaction_date DESC");
    return result.rows;
  },
};

module.exports = Transaction;
