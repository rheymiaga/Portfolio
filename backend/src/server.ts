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

const allowedOrigins: string[] = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://rheylouiemiaga.onrender.com",
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

app.use("/chat", chatRouter);
app.use("/api", feedbackRouter,);
app.use("/api/auth", adminRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});