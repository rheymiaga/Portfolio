import express from "express";
import type { Request, Response, NextFunction } from 'express'
import dotenv from "dotenv";
import cors from "cors";
import type { CorsOptions } from 'cors'
import chatRouter from "./routes/chat.js";
import feedbackRouter from "./routes/feedbacks.js";
import adminRouter from "./routes/admin.js"

dotenv.config();

const app = express();
app.set('trust proxy', 1);

const allowedOrigins: string[] = [
    "https://rheymiaga.onrender.com",
    "http://localhost:3000",
    "http://localhost:3001",
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/chat", chatRouter);
app.use("/api", feedbackRouter);
app.use("/api/auth", adminRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Server Error Stack:", err.stack);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});