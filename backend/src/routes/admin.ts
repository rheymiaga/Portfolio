import { Router } from "express";
import {
    // createAdmin,
    getAllAdmins,
    deleteAdmin,
    loginAdmin,
    loginAuth,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/auth.js";

const adminRouter = Router();


adminRouter.post("/login", loginAdmin);

adminRouter.get("/me", protect, loginAuth);
adminRouter.get("/admin", protect, getAllAdmins);
adminRouter.delete("/admin/:id", protect, deleteAdmin);

export default adminRouter;
