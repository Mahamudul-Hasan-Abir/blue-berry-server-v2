import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Blue Berry Server V2");
});

app.use("/api/v2", router);

export default app;
