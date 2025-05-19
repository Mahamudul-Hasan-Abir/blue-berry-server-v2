import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://blue-berry-v2.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins, // your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Blue Berry Server V2");
});

app.use("/api/v2", router);

export default app;
