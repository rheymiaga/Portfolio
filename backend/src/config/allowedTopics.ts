
export interface AllowedTopicsConfig {
    allowedKeywords: string[];
    defaultReply: string;
}

const allowedTopics: AllowedTopicsConfig = {
    allowedKeywords: [
        "rhey", "louie", "miaga", "rei", "who", "about", "portfolio", "cv", "resume",
        "hire", "work", "job", "opportunity", "intern", "role", "position",
        "freelance", "commission", "projects", "service", "available", "availability",
        "salary", "pay", "rate", "price", "looking",
        "email", "gmail", "contact", "reach", "message", "socials", "github", "linkedin",
        "helmet", "security headers", "xss", "clickjacking",
        "joi", "validation", "schema", "data integrity",
        "rate limit", "brute force", "spam", "express-rate-limit",
        "bcrypt", "hashing", "password security",
        "multer", "file upload", "uploading",
        "cookie", "cookie-parser", "http-only",
        "cors", "allowed origins", "middleware",
        "jwt", "auth", "authentication", "rbac", "permissions", "roles", "security",
        "framer motion", "animations", "motion", "3d", "interactive",
        "tech", "stack", "languages", "coding", "skills", "react", "typescript", "node",
        "postgresql", "tailwind", "database", "backend", "frontend", "experience",
        "age", "birthday", "born", "live", "location", "pasig", "philippines",
        "coffee", "hobbies", "dog", "scotch", "shih tzu", "roblox", "pandemic",
        "hello", "hi", "hey", "help", "question", "can you", "tell me",
        "why", "reason", "started", "start", "begin", "motivation", "origin", "how",
        "celine", "philomena", "philo", "velasco", "girlfriend", "partner", "artist",
        "education", "bsit", "school", "college", "trimester", "shs", "ict",
        "milestone", "passion", "goals", "six-digits", "clean code",
        "sino", "ano", "paano", "kailan", "nasaan", "bakit", "kamusta", "kumusta",
        "taga", "saan", "marunong", "ka ba", "kilala", "mo", "trabaho", "bayad",
        "presyo", "magkano", "usap", "tayo", "tulong", "aso", "gf", "kasintahan"
    ],
    defaultReply: "I'm Rei, Rhey's AI assistant. I'm trained to discuss his projects, skills, and background. Feel free to ask about his tech stack in English or Tagalog! 😊"
};

export default allowedTopics;