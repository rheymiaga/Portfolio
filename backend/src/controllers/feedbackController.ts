import type { Request, Response, NextFunction } from "express";
import {
    getAllFeedbackService,
    getFeedbacksByIPService,
    getFeedbacksByDeviceService,
    createFeedbackService,
    deleteFeedbackService,
} from "../models/feedbackServices.js";
import type { Feedback } from "../models/props.js";

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
    deviceId: string;
}

export const createFeedback = async (
    req: Request<{}, {}, FeedbackPayload>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, text, deviceId } = req.body;
        const ip: string = req.ip || "unknown";

        if (!text || text.trim().length === 0) {
            return handleResponse(res, 400, "Feedback text is required");
        }

        if (!deviceId) {
            return handleResponse(res, 400, "Device identifier is missing");
        }

        const deviceFeedbacks = await getFeedbacksByDeviceService(deviceId);
        if (deviceFeedbacks.length >= 2) {
            return handleResponse(res, 429, "Submission limit reached. Please try again in 12 hours.");
        }

        const ipFeedbacks = await getFeedbacksByIPService(ip);
        if (ipFeedbacks.length >= 20) {
            return handleResponse(res, 429, "Too many requests from this network.");
        }
        const newFeedback: Feedback = await createFeedbackService(name ?? null, text, ip, deviceId);

        handleResponse(res, 201, "Feedback submitted successfully", newFeedback);
    } catch (err) {
        console.error("Error creating feedback:", err);
        return handleResponse(res, 500, "Internal Server Error");
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
        return handleResponse(res, 500, "Internal Server Error");
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
        return handleResponse(res, 500, "Internal Server Error");
    }
};