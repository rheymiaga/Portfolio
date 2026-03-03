import pool from "../config/db.js";

export const getAllFeedbackService = async () => {
    const result = await pool.query(
        "SELECT id, name, text, ip_address, device_id, created_at FROM feedbacks ORDER BY created_at DESC"
    );
    return result.rows;
};

export const getFeedbacksByDeviceService = async (deviceId: string) => {
    const result = await pool.query(
        `SELECT id FROM feedbacks 
         WHERE device_id = $1 
         AND created_at > NOW() - INTERVAL '12 hours'`,
        [deviceId]
    );
    return result.rows;
};

export const getFeedbacksByIPService = async (ip: string) => {
    const result = await pool.query(
        `SELECT id FROM feedbacks 
         WHERE ip_address = $1 
         AND created_at > NOW() - INTERVAL '12 hours'`,
        [ip]
    );
    return result.rows;
};

export const createFeedbackService = async (
    name: string | null,
    text: string,
    ip: string,
    deviceId: string
) => {
    const result = await pool.query(
        `INSERT INTO feedbacks (name, text, ip_address, device_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, text, ip_address, device_id, created_at`,
        [name, text, ip, deviceId]
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