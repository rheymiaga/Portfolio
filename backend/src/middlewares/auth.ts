import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from 'jsonwebtoken';
import pool from "../config/db.js";

interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

interface DecodedToken extends JwtPayload {
    id: number;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        const result = await pool.query(
            "SELECT id, email, role FROM admin WHERE id = $1",
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Not authorized, admin not found" });
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};