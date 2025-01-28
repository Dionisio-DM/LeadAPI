import cors from "cors";
import express from "express";
import { router } from "./routes";
import { json } from "stream/consumers";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado em: http://localhost:${PORT}`)
);
