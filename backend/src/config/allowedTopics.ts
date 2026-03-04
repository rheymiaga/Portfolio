
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
        "milestone", "passion", "goals", "six-digits", "clean code"
    ],
    defaultReply: "I'm Rei, Rhey's AI assistant. I'm trained to discuss his projects, skills, and background. Feel free to ask about his tech stack, or how to contact him!"
};

export default allowedTopics;