import { Router } from "express";
import { createFeedback, getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.post("/feedbacks", createFeedback);
router.get("/feedbacks", getAllFeedbacks);
router.delete("/feedbacks/:id", deleteFeedback);

export default router;
