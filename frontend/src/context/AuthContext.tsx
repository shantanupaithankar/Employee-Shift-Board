import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api/auth';
import { LoginCredentials, RegisterData, AuthResponse } from '../types';

interface AuthContextType {
    user: AuthResponse['user'] | null;
    token: string | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAdmin: () => boolean;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and user in localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const response = await authApi.login(credentials);
        console.log('Login response:', response);
        console.log('User role:', response.user.role);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    };

    const register = async (data: RegisterData) => {
        const response = await authApi.register(data);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAdmin = () => user?.role === 'admin';
    const isAuthenticated = () => !!token && !!user;

    const value: AuthContextType = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
