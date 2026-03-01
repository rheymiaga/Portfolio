import type { Request, Response, NextFunction } from "express";
import {
    getAllFeedbackService,
    getFeedbacksByIPService,
    createFeedbackService,
    deleteFeedbackService,
} from "../models/feedbackServices.js";
import type { Feedback } from "../models/feedbacks.js";

const handleResponse = <T>(
    res: Response,
    status: number,
    message: string,
    data?: T
): void => {
    res.status(status).json({
        status,
        message,
        data: data ?? null,
    });
};

interface FeedbackPayload {
    name?: string;
    text: string;
}

export const createFeedback = async (
    req: Request<{}, {}, FeedbackPayload>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, text } = req.body;

        if (!req.ip) {
            return handleResponse(res, 400, "Unable to determine client IP");
        }
        const ip: string = req.ip;

        if (!text || text.trim().length === 0) {
            return handleResponse(res, 400, "Feedback text is required");
        }

        const feedbacks = await getFeedbacksByIPService(ip);

        if (feedbacks.length >= 2) {
            return handleResponse(res, 429, "Daily limit reached (2 messages per 24h)");
        }

        const newFeedback: Feedback = await createFeedbackService(name ?? null, text, ip);

        handleResponse(res, 201, "Feedback submitted successfully", newFeedback);
    } catch (err) {
        console.error("Error creating feedback:", err);
        next(err);
    }
};

export const getAllFeedbacks = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const feedbacks: Feedback[] = await getAllFeedbackService();

        if (feedbacks.length === 0) {
            return handleResponse(res, 204, "No feedbacks found");
        }

        handleResponse(res, 200, "Feedbacks fetched successfully", feedbacks);
    } catch (err) {
        console.error("Error fetching feedbacks:", err);
        next(err);
    }
};

export const deleteFeedback = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deletedFeedback: Feedback | null = await deleteFeedbackService(id);

        if (!deletedFeedback) {
            return handleResponse(res, 404, "Feedback not found");
        }

        handleResponse(res, 200, "Feedback deleted successfully", deletedFeedback);
    } catch (err) {
        console.error("Error deleting feedback:", err);
        next(err);
    }
};
