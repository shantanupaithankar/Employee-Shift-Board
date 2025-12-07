export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    employeeCode: string;
    department: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Shift {
    _id: string;
    employeeId: User | string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    createdAt?: string;
    updatedAt?: string;
}

export interface PopulatedShift extends Omit<Shift, 'employeeId'> {
    employeeId: User;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'user';
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    employeeCode: string;
    department: string;
}

export interface CreateShiftData {
    employeeId: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface ApiError {
    msg: string;
    errors?: Array<{ msg: string; param: string }>;
}
