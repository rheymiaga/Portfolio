import type { Request, Response } from "express";
import { Router } from "express";
import axios from "axios";
import allowedTopics from "../config/allowedTopics.js";
import { portfolioReplies } from "../config/portfolioReplies.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { message } = req.body;
    const lowerMsg = message.toLowerCase();

    const isAllowed = allowedTopics.allowedKeywords.some(keyword =>
        lowerMsg.includes(keyword)
    );

    if (!isAllowed) {
        return res.json({ reply: allowedTopics.defaultReply });
    }

    for (const keyword of Object.keys(portfolioReplies)) {
        if (lowerMsg.includes(keyword)) {
            return res.json({ reply: portfolioReplies[keyword] });
        }
    }

    try {
        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing Gemini API key");
            return res.status(500).json({ error: "Gemini API key not configured" });
        }

        const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are Rhey's portfolio assistant. Only answer questions about Rhey, his projects, skills, experience, personal details, and portfolio. 
                       If asked anything else, politely say: 'Please ask only about Rhey and his portfolio.'`
                            },
                            { text: message }
                        ]
                    }
                ]
            }
        );

        const reply = aiResponse.data.candidates[0].content.parts[0].text;
        res.json({ reply });
    } catch (error: any) {
        console.error("Error calling Gemini API:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get response from Gemini" });
    }
});

export default router;
