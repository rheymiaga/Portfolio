export interface Feedback {
    id: number;
    name?: string | null;
    text: string;
    ip_address: string;
    created_at: Date;
}
