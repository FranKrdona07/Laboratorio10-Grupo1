import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());


app.use("/users", userRoutes);
app.use("/", authRoutes);

import customersRoutes from "./routes/customers.js";
import salesRoutes from "./routes/sales.js";

app.use('/api/customers', customersRoutes);
app.use('/api/sales', salesRoutes);


app.get("/tests", (req, res) => {
  console.log("Sí estoy funcionando");
  return res.status(200).json({ status: "done" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

