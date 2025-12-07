import api from './client';
import { AuthResponse, LoginCredentials, RegisterData } from '../types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    seedUsers: async (): Promise<{ msg: string }> => {
        const response = await api.get<{ msg: string }>('/auth/seed');
        return response.data;
    },
};
