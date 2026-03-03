import pool from "../config/db.js";

export const getAllFeedbackService = async () => {
    const result = await pool.query(
        "SELECT id, name, text, ip_address, device_id, created_at FROM feedbacks ORDER BY created_at DESC"
    );
    return result.rows;
};

// Added :string type to deviceId
export const getFeedbacksByDeviceService = async (deviceId: string) => {
    const result = await pool.query(
        `SELECT id FROM feedbacks 
         WHERE device_id = $1 
         AND created_at > NOW() - (INTERVAL '12 hours')`,
        [deviceId]
    );
    return result.rows;
};

// Added :string type to ip
export const getFeedbacksByIPService = async (ip: string) => {
    const result = await pool.query(
        `SELECT id FROM feedbacks 
         WHERE ip_address = $1 
         AND created_at > NOW() - (INTERVAL '12 hours')`,
        [ip]
    );
    return result.rows;
};

// Defined types for all creation parameters
export const createFeedbackService = async (
    name: string | null,
    text: string,
    ip: string,
    deviceId: string
) => {
    // Safety handling to prevent 500 errors
    const safeName = name?.trim() || "Anonymous";
    const safeDeviceId = deviceId || "unknown_device";

    const result = await pool.query(
        `INSERT INTO feedbacks (name, text, ip_address, device_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, text, ip_address, device_id, created_at`,
        [safeName, text, ip, safeDeviceId]
    );
    return result.rows[0];
};

// Added :number type to id
export const deleteFeedbackService = async (id: number) => {
    const result = await pool.query(
        "DELETE FROM feedbacks WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};