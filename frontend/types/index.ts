export interface User {
    _id: string; // MongoDB ID often comes as _id
    id?: string; // Sometimes flattened to id
    name: string;
    email: string;
    role: 'admin' | 'user';
    department?: string;
    employeeCode?: string;
}

export interface Shift {
    _id: string;
    employeeId: User; // Populated user object
    date: string;
    startTime: string;
    endTime: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ShiftFormData {
    employeeId: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface ApiError {
    msg: string;
}
