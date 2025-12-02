const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const depositoRoutes = require("./routes/depositoRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoute = require("./routes/transactionRoute")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/customers", customerRoutes);
app.use("/api/deposito", depositoRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions",transactionRoute );

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
