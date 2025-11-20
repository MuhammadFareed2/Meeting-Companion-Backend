import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./src/routes/index";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

if (!process.env.DB_URL) {
  throw new Error("❌ DB_URL is not defined in environment variables.");
}

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB is connected.");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Meeting Companion Backend is running...");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
