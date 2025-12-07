import api from './client';
import { Shift, PopulatedShift, CreateShiftData } from '../types';

export const shiftsApi = {
    getShifts: async (params?: { employee?: string; date?: string }): Promise<PopulatedShift[]> => {
        const response = await api.get<PopulatedShift[]>('/shifts', { params });
        return response.data;
    },

    createShift: async (data: CreateShiftData): Promise<Shift> => {
        const response = await api.post<Shift>('/shifts', data);
        return response.data;
    },

    deleteShift: async (id: string): Promise<{ msg: string }> => {
        const response = await api.delete<{ msg: string }>(`/shifts/${id}`);
        return response.data;
    },
};
