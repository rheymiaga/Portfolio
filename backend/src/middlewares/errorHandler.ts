import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error:", err);

    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
    });
};
