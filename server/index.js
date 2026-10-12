import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import connectDB from "./db/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.send("HunarHub Backend Running...");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});