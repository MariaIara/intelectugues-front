import { api } from "@/lib/api";

export async function login(email, password) {
    return await api.post('/login', { email, password });
}