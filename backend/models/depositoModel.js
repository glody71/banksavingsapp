const db = require("../config/db");

const DepositoTypes = {
  //getAll
  getAllDepositoTypes() {
    return db.query("SELECT * FROM deposito_types ORDER BY id");
  },

  //getOne
  getOneDepositoTypes(id) {
    return db.query("SELECT * FROM deposito_types where id = $1", [id]);
  },

  //create
  createDepositoTypes(name, yearly_return) {
    return db.query(
      "INSERT INTO deposito_types (name, yearly_return) VALUES ($1, $2) RETURNING *",
      [name, yearly_return]
    );
  },

  //update
  updateDepositoTypes(id, name, yearly_return) {
    return db.query(
      "UPDATE deposito_types SET name = $1, yearly_return = $2 WHERE id = $3 RETURNING *",
      [name, yearly_return, id]
    );
  },

  //delete
  deleteDepositoTypes(id) {
    return db.query("DELETE FROM deposito_types where id = $1", [id]);
  },
};

module.exports = DepositoTypes;