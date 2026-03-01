import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use("/chat", chatRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
