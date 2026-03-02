export interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: Date;
}

export interface Admin {
    id: number;
    email: string;
    password?: string;
    role: "admin";
}
