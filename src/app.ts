import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Blue Berry Server V2");
});

app.use("/api/v2", router);

export default app;
