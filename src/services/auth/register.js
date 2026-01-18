import { api } from "@/lib/api";

export async function register(name, email, password, password_confirmation) {
    return await api.post('/register', { name, email, password, password_confirmation });
}