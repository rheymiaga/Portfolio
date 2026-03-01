// config/allowedTopics.ts

export interface AllowedTopicsConfig {
    allowedKeywords: string[];
    defaultReply: string;
}

const allowedTopics: AllowedTopicsConfig = {
    allowedKeywords: [
        "rhey",
        "rhey louie",
        "rhey louie miaga",
        "portfolio",
        "tech stack",
        "tech",
        "technology stack",
        "technology",
        "projects",
        "skills",
        "experience",
        "hero",
        "about",
        "expected salary",
        "career goals",
        "availability",
        "strengths",
        "weaknesses",
        "why hire you",
        "future plans",
        "age",
        "birthday",
        "bday",
        "born",
        "where do i live",
        "live",
        "location",
        "coffee",
        "hobbies",
        "fun fact",
        "dog",
        "scotch",
        "hello"
    ],
    defaultReply: "Please ask only about Rhey and his portfolio."
};

export default allowedTopics;
