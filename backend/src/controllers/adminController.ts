import type { Request, Response, NextFunction } from "express";
import {
    getAllAdminsService,
    getAdminByEmailService,
    // createAdminService,
    deleteAdminService,
} from "../models/adminServices.js";
import type { Admin } from "../models/props.js";
import { generateToken } from "../utils/generateTokens.js";
import bcrypt from "bcrypt";

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

interface AdminPayload {
    email: string;
    password: string;
}

// export const createAdmin = async (
//     req: Request<{}, {}, AdminPayload>,
//     res: Response,
//     next: NextFunction
// ): Promise<void> => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return handleResponse(res, 400, "Email and password are required");
//         }

//         const existingAdmin = await getAdminByEmailService(email);
//         if (existingAdmin) {
//             return handleResponse(res, 409, "Admin with this email already exists");
//         }

//         const newAdmin: Admin = await createAdminService(email, password);
//         handleResponse(res, 201, "Admin created successfully", newAdmin);
//     } catch (err) {
//         console.error("Error creating admin:", err);
//         return handleResponse(res, 500, "Internal Server Error");
//     }
// };


export const loginAuth = async (req: Request, res: Response) => {
    res.json((req as any).user);
}

export const loginAdmin = async (
    req: Request<{}, {}, AdminPayload>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return handleResponse(res, 400, "Email and password are required");
        }

        const admin = await getAdminByEmailService(email);
        if (!admin) {
            return handleResponse(res, 401, "Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return handleResponse(res, 401, "Invalid credentials");
        }

        const token = generateToken(admin.id);

        handleResponse(res, 200, "Login successful", {
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (err) {
        console.error("Error logging in:", err);
        return handleResponse(res, 500, "Internal Server Error");
    }
};

export const getAllAdmins = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const admins: Admin[] = await getAllAdminsService();

        if (admins.length === 0) {
            return handleResponse(res, 204, "No admins found");
        }

        handleResponse(res, 200, "Admins fetched successfully", admins);
    } catch (err) {
        console.error("Error fetching admins:", err);
        return handleResponse(res, 500, "Internal Server Error");
    }
};

export const deleteAdmin = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deletedAdmin: Admin | null = await deleteAdminService(id);

        if (!deletedAdmin) {
            return handleResponse(res, 404, "Admin not found");
        }

        handleResponse(res, 200, "Admin deleted successfully", deletedAdmin);
    } catch (err) {
        console.error("Error deleting admin:", err);
        return handleResponse(res, 500, "Internal Server Error");
    }
};
