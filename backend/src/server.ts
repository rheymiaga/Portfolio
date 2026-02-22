import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/', async (req: Request, res: Response) => {
    console.log('working backend')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
