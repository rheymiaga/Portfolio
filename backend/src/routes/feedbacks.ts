import { Router } from "express";
import { createFeedback, getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.post("/users", createFeedback);
router.get("/users", getAllFeedbacks);
router.delete("/users/:id", deleteFeedback);

export default router;
