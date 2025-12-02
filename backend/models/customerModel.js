const db = require("../config/db");

const Customer = {
  //fetchAll
  getAll() {
    return db.query("SELECT * FROM customers ORDER BY id");
  },

  //fetchOne
  getbyId(id) {
    return db.query("SELECT * FROM customers where id = $1", [id]);
  },

  //update
  update(name, id) {
    return db.query("UPDATE customers SET name = $1 WHERE id = $2 RETURNING *", [
      name,
      id,
    ]);
  },

  //delete
  delete(id) {
    return db.query("DELETE FROM customers where id = $1", [id]);
  },

  //create
  create(name) {
    return db.query("INSERT INTO customers (name) VALUES ($1) RETURNING *", [name]);
  },
};


module.exports = Customer;