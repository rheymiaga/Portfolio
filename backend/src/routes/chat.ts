import { Router } from "express";
import axios from "axios";
import allowedTopics from "../config/allowedTopics.js";
import { rheyContext } from "../config/rheyContext.js";

const router = Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });
    const lowerMsg = message.toLowerCase();
    const isAllowed = allowedTopics.allowedKeywords.some(keyword =>
        lowerMsg.includes(keyword)
    );

    if (!isAllowed) {
        return res.json({ reply: allowedTopics.defaultReply });
    }

    try {
        const response = await axios({
            method: 'post',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`,
            params: {
                key: process.env.GEMINI_API_KEY
            },
            data: {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `
                                You are Rei, the intelligent AI assistant for Rhey Louie Miaga's portfolio.
                                Use the following DATA to answer the user's question accurately.

                                DATA ABOUT RHEY:
                                ${JSON.stringify(rheyContext, null, 2)}

                                GUIDELINES:
                                - Be professional, witty, and concise.
                                - If asked about hiring or contact, always mention mrheylouie@gmail.com.
                                - If the data doesn't contain the answer, say: "${allowedTopics.defaultReply}"
                                - Use emojis occasionally (🚀, ☕) to stay friendly.
                                
                                USER QUESTION: "${message}"
                                `
                            }
                        ]
                    }
                ]
            }
        });

        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.json({ reply: "I'm not sure about that. Let's talk about Rhey's skills instead! 🚀" });
        }

        res.json({ reply });

    } catch (error: any) {
        const status = error.response?.status;
        const errorDetails = error.response?.data?.error?.message || error.message;

        console.error(`Gemini Error (${status}):`, errorDetails);

        if (status === 429) {
            return res.status(429).json({
                reply: "Whoa! I'm getting a lot of questions. Give me a minute to breathe! ☕"
            });
        }
        res.status(status || 500).json({
            reply: "I'm having a bit of a brain freeze. Please email Rhey at mrheylouie@gmail.com!"
        });
    }
});

export default router;