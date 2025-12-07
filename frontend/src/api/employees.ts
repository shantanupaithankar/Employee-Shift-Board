import api from './client';
import { User } from '../types';

export const employeesApi = {
    getEmployees: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/employees');
        return response.data;
    },
};
