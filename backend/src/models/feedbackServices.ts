import pool from "../config/db.js";

export const getAllFeedbackService = async () => {
    const result = await pool.query(
        "SELECT id, name, text, ip_address, created_at FROM feedbacks ORDER BY created_at DESC"
    );
    return result.rows;
};

export const getFeedbacksByIPService = async (ip: string) => {
    const result = await pool.query(
        `SELECT id, name, text, created_at 
     FROM feedbacks 
     WHERE ip_address = $1 
     AND created_at > NOW() - INTERVAL '24 hours'`,
        [ip]
    );
    return result.rows;
};

export const createFeedbackService = async (
    name: string | null,
    text: string,
    ip: string
) => {
    const result = await pool.query(
        `INSERT INTO feedbacks (name, text, ip_address) 
     VALUES ($1, $2, $3) 
     RETURNING id, name, text, ip_address, created_at`,
        [name, text, ip]
    );
    return result.rows[0];
};

export const deleteFeedbackService = async (id: number) => {
    const result = await pool.query(
        "DELETE FROM feedbacks WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};