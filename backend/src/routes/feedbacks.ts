import { Router } from "express";
import { createFeedback, getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/feedbacks", createFeedback);

router.get("/feedbacks", protect, getAllFeedbacks);
router.delete("/feedbacks/:id", protect, deleteFeedback);

export default router;
