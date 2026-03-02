import pool from "../config/db.js";
import bcrypt from "bcrypt";


export const createAdminService = async (email: string, password: string) => {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
        `INSERT INTO admin (email, password) 
         VALUES ($1, $2) 
         RETURNING id, email, role`,
        [email, hashedPassword]
    );
    return result.rows[0];
};

export const getAllAdminsService = async () => {
    const result = await pool.query(
        "SELECT id, email, role FROM admin ORDER BY id ASC"
    );
    return result.rows;
};

export const getAdminByEmailService = async (email: string) => {
    const result = await pool.query(
        "SELECT id, email, password, role FROM admin WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

export const deleteAdminService = async (id: number) => {
    const result = await pool.query(
        "DELETE FROM admin WHERE id = $1 RETURNING id, email, role",
        [id]
    );
    return result.rows[0];
};
